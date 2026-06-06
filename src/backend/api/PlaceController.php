<?php

namespace App\Http\Controllers\Api;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PlaceController extends Controller
{
    // GET /api/places - Lấy danh sách tất cả quán ăn
    public function index(Request $request)
    {
        try {
            $query = Place::query();

            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where('name', 'like', "%$search%")
                      ->orWhere('description', 'like', "%$search%");
            }

            $places = $query->get();

            return response()->json([
                'success' => true,
                'data' => $places,
                'count' => count($places)
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // POST /api/places - Tạo quán ăn mới
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category_id' => 'required|exists:categories,id',
                'address' => 'required|string',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email',
                'website' => 'nullable|url',
                'image' => 'nullable|string',
                'rating' => 'nullable|numeric|min:0|max:5',
                'status' => 'required|in:active,inactive'
            ]);

            $place = Place::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo quán ăn thành công',
                'data' => $place
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

    // GET /api/places/{id} - Lấy chi tiết một quán ăn
    public function show(int $id)
    {
        try {
            $place = Place::find($id);
            if (!$place) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quán ăn không tồn tại'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $place
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // PUT /api/places/{id} - Cập nhật quán ăn
    public function update(Request $request, int $id)
    {
        try {
            $place = Place::find($id);
            if (!$place) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quán ăn không tồn tại'
                ], 404);
            }

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'category_id' => 'sometimes|exists:categories,id',
                'address' => 'sometimes|string',
                'latitude' => 'sometimes|numeric',
                'longitude' => 'sometimes|numeric',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email',
                'website' => 'nullable|url',
                'image' => 'nullable|string',
                'rating' => 'nullable|numeric|min:0|max:5',
                'status' => 'sometimes|in:active,inactive'
            ]);

            $place->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật quán ăn thành công',
                'data' => $place
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

    // DELETE /api/places/{id} - Xóa quán ăn
    public function destroy(int $id)
    {
        try {
            $place = Place::find($id);
            if (!$place) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quán ăn không tồn tại'
                ], 404);
            }

            $place->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa quán ăn thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }
}
