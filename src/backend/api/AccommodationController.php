<?php

namespace App\Http\Controllers\Api;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AccommodationController extends Controller
{
    // GET /api/accommodations - Lấy danh sách tất cả khách sạn
    public function index(Request $request)
    {
        try {
            $query = Accommodation::query();

            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where('name', 'like', "%$search%")
                      ->orWhere('description', 'like', "%$search%");
            }

            if ($request->has('min_price') && $request->has('max_price')) {
                $query->whereBetween('price_per_night', [$request->min_price, $request->max_price]);
            }

            if ($request->has('min_rating')) {
                $query->where('rating', '>=', $request->min_rating);
            }

            $accommodations = $query->get();

            return response()->json([
                'success' => true,
                'data' => $accommodations,
                'count' => count($accommodations)
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // POST /api/accommodations - Tạo khách sạn mới
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
                'price_per_night' => 'required|numeric|min:0',
                'rooms' => 'required|integer|min:1',
                'status' => 'required|in:active,inactive'
            ]);

            $accommodation = Accommodation::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo khách sạn thành công',
                'data' => $accommodation
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

    // GET /api/accommodations/{id} - Lấy chi tiết khách sạn
    public function show(int $id)
    {
        try {
            $accommodation = Accommodation::find($id);
            if (!$accommodation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Khách sạn không tồn tại'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $accommodation
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // PUT /api/accommodations/{id} - Cập nhật khách sạn
    public function update(Request $request, int $id)
    {
        try {
            $accommodation = Accommodation::find($id);
            if (!$accommodation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Khách sạn không tồn tại'
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
                'price_per_night' => 'sometimes|numeric|min:0',
                'rooms' => 'sometimes|integer|min:1',
                'status' => 'sometimes|in:active,inactive'
            ]);

            $accommodation->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật khách sạn thành công',
                'data' => $accommodation
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

    // DELETE /api/accommodations/{id} - Xóa khách sạn
    public function destroy(int $id)
    {
        try {
            $accommodation = Accommodation::find($id);
            if (!$accommodation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Khách sạn không tồn tại'
                ], 404);
            }

            $accommodation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa khách sạn thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }
}
