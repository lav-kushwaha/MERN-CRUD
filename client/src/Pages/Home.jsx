import React, { useEffect, useState } from "react";
import notesApi from "../api/notesAPI";

const initialFormData = {
  title: "",
  content: "",
};

const Home = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.getAll();
      setNotes(response?.data?.data || []);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await notesApi.update(editingId, formData);
        setEditingId(null);
      } else {
        await notesApi.create(formData);
      }
      setFormData(initialFormData);
      fetchNotes();
    } catch (err) {
      console.error("Create note error:", err);
      setError("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await notesApi.remove(id);
      fetchNotes();
    } catch (error) {
      console.log("Error in deleting notes" + error);
      setError("Failed to delete notes");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setFormData({
      title: note.title,
      content: note.content,
    });
  };

  return (
  <div className="min-h-screen bg-gray-50 py-10">
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Form */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Note" : "Create Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            rows="4"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {editingId ? "Update" : "Save"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && (
          <p className="text-sm text-red-500 mt-3">{error}</p>
        )}
      </div>

      {/* Notes */}
      {/* Notes */}
<div>
  <h3 className="text-md font-semibold text-gray-800 mb-3">
    Notes
  </h3>

  {loading && <p className="text-sm text-gray-500">Loading...</p>}

  {!loading && notes.length === 0 && (
    <p className="text-sm text-gray-500">No notes yet.</p>
  )}

  <ul className="divide-y border rounded bg-white">
    {notes.map(({ _id, title, content }) => (
      <li
        key={_id}
        className="flex items-center justify-between px-4 py-2"
      >
        <div className="flex-1 truncate">
          <span className="font-medium text-gray-800 mr-2">
            {title}
          </span>
          <span className="text-gray-500 text-sm truncate">
            — {content}
          </span>
        </div>

        <div className="flex gap-3 text-sm ml-4 shrink-0">
          <button
            onClick={() => handleEdit({ _id, title, content })}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>


    </div>
  </div>
);
};

export default Home;
