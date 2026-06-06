<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();

        if ($request->filled('q')) {
            $q = $request->input('q');
            $query->where('title', 'like', "%{$q}%")
                  ->orWhere('content', 'like', "%{$q}%")
                  ->orWhere('excerpt', 'like', "%{$q}%");
        }

        $articles = $query->orderBy('published_at', 'desc')
                          ->paginate(10)
                          ->withQueryString();

        return view('articles.index', [
            'articles' => $articles,
            'search_query' => $request->input('q', ''),
        ]);
    }

    public function show(Article $article)
    {
        return view('articles.show', [
            'article' => $article,
        ]);
    }
}
