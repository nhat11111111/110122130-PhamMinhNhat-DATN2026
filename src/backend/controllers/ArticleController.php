<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\Request;use Illuminate\Support\Str;use Illuminate\Routing\Controller;

class ArticleController extends Controller
{
    // GET /api/articles - Lấy danh sách tất cả bài viết
    public function index(Request $request)
    {
        try {
            $query = Article::query();

            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where('title', 'like', "%$search%")
                      ->orWhere('content', 'like', "%$search%");
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $articles = $query->get();

            return response()->json([
                'success' => true,
                'data' => $articles,
                'count' => count($articles)
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // POST /api/articles - Tạo bài viết mới
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'author_id' => 'required|exists:users,id',
                'category_id' => 'required|exists:categories,id',
                'image' => 'nullable|string',
                'slug' => 'nullable|string|unique:articles',
                'status' => 'required|in:draft,published,archived'
            ]);

            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            $validated['views'] = 0;
            $article = Article::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo bài viết thành công',
                'data' => $article
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xác thực',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // GET /api/articles/{id} - Lấy chi tiết bài viết
    public function show(int $id)
    {
        try {
            $article = Article::find($id);
            if (!$article) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bài viết không tồn tại'
                ], 404);
            }

            // Tăng view count
            $article->increment('views');

            return response()->json([
                'success' => true,
                'data' => $article
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // PUT /api/articles/{id} - Cập nhật bài viết
    public function update(Request $request, int $id)
    {
        try {
            $article = Article::find($id);
            if (!$article) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bài viết không tồn tại'
                ], 404);
            }

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'author_id' => 'sometimes|exists:users,id',
                'category_id' => 'sometimes|exists:categories,id',
                'image' => 'nullable|string',
                'slug' => 'sometimes|string|unique:articles,slug,' . $id,
                'status' => 'sometimes|in:draft,published,archived'
            ]);

            if (isset($validated['title']) && empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            $article->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật bài viết thành công',
                'data' => $article
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xác thực',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // DELETE /api/articles/{id} - Xóa bài viết
    public function destroy(int $id)
    {
        try {
            $article = Article::find($id);
            if (!$article) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bài viết không tồn tại'
                ], 404);
            }

            $article->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa bài viết thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }
}
