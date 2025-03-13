import { useState, useMemo } from "react";
import { useGetPostsQuery } from "../lib/postsApi";
import useDebounce from "../hooks/useDebounce";
import Filter from "./Filter";

function PostList() {
  const { data: posts = [], error, isLoading } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm) return posts || [];
    return posts?.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, posts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <i className="fa-solid fa-spinner animate-spin text-white"></i>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Xatolik yuz berdi! Qaytadan urunib ko'ring.
      </p>
    );
  }

  return (
    <div className="p-6 mx-auto bg-gray-900 min-h-screen text-gray-200">
      <Filter searchTerm={searchTerm} onSearch={setSearchTerm} />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-400">Hech qanday post topilmadi!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-lg"
            >
              <h2 className="text-white text-xl font-bold">{post.title}</h2>
              <p className="text-gray-400 mt-2">{post.body}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 text-gray-300">
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-eye"></i> {post.views} ta ko'rish
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-thumbs-up text-green-500"></i>
                  {post.reactions?.likes || 0}
                  <i className="fa-solid fa-thumbs-down text-red-500"></i>
                  {post.reactions?.dislikes || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
