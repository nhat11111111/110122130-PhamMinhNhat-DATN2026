<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Models\Article;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Search places and articles
     * GET /api/search?q=keyword
     */
    public function search(Request $request)
    {
        try {
            $keyword = $request->query('q', '');
            
            // Validate keyword
            if (strlen($keyword) < 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'Từ khóa tìm kiếm phải có ít nhất 2 ký tự',
                    'results' => []
                ]);
            }
            
            // Search in places (restaurants, attractions)
            $places = Place::where('name', 'LIKE', "%{$keyword}%")
                ->orWhere('description', 'LIKE', "%{$keyword}%")
                ->select('id', 'name', 'description', 'rating')
                ->limit(5)
                ->get()
                ->map(function ($place) {
                    return [
                        'id' => $place->id,
                        'type' => 'place',
                        'name' => $place->name,
                        'description' => substr($place->description ?? '', 0, 100),
                        'rating' => $place->rating,
                        'excerpt' => substr($place->description ?? '', 0, 100)
                    ];
                });
            
            // Search in articles
            $articles = Article::where('title', 'LIKE', "%{$keyword}%")
                ->orWhere('content', 'LIKE', "%{$keyword}%")
                ->where('status', 'published')
                ->select('id', 'title', 'content')
                ->limit(5)
                ->get()
                ->map(function ($article) {
                    return [
                        'id' => $article->id,
                        'type' => 'article',
                        'name' => $article->title,
                        'title' => $article->title,
                        'description' => substr($article->content ?? '', 0, 100),
                        'excerpt' => substr($article->content ?? '', 0, 100)
                    ];
                });
            
            // Combine results
            $results = $places->concat($articles)->take(10);
            
            return response()->json([
                'success' => true,
                'keyword' => $keyword,
                'results' => $results,
                'total' => $results->count()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tìm kiếm: ' . $e->getMessage(),
                'results' => []
            ], 500);
        }
    }
}
