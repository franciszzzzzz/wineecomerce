"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { MultiValue, ActionMeta } from "react-select";

export default function AdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Dynamic import of react-select
  const Select = dynamic(
  () => import("react-select").then((mod) => mod.default),
  { ssr: false }
) as unknown as React.ComponentType<{
  isMulti?: boolean;
  name?: string;
  options: { value: string; label: string }[];
  value?: { value: string; label: string }[];
  onChange: (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
  placeholder?: string;
}>;

  const [form, setForm] = useState({
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    priceRange: "",
    bottlePrice: "",
    cartonPrice: "",
    sku: "",
    categoryIds: [] as string[],
    alcVol: "",
    bottlesPerCarton: "",
  });


  // ✅ Fetch products
 useEffect(() => {
  fetch(`/api/products?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((data) => {
      setItems(data.products || []);
      setPages(data.pages || 1);
    })
    .catch((err) => console.error("Error fetching products:", err));
}, [page]);

  // ✅ Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);


  // Define the response type
interface DeleteResponse {
  success?: boolean;
  error?: string;
}

  // ✅ Delete product
const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

    // ✅ Safely parse JSON
    let data: DeleteResponse;
    try {
      data = await res.json();
    } catch {
      data = { success: res.ok };
    }

    if (res.ok && data.success) {
      alert("✅ Product deleted!");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("❌ Failed to delete product");
    }
  } catch (err) {
    console.error("⚠️ Error deleting product:", err);
    alert("⚠️ Error deleting product");
  }
};


  // ✅ Edit product
  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
      priceRange: product.priceRange || "",
      bottlePrice: product.bottlePrice?.toString() || "",
      cartonPrice: product.cartonPrice?.toString() || "",
      sku: product.sku || "",
      categoryIds:
        product.categories?.map((link: any) => link.category.id) || [],
      alcVol: product.alcVol || "",
      bottlesPerCarton: product.bottlesPerCarton?.toString() || "",
    });
  };

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      bottlePrice: Number(form.bottlePrice) || 0,
      cartonPrice: Number(form.cartonPrice) || 0,
      bottlesPerCarton: Number(form.bottlesPerCarton) || 0,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
  alert(editingId ? "✅ Product updated!" : "✅ Product added!");

  // 🔥 Fetch with page + limit so pagination stays correct
  const updated = await fetch(`/api/products?page=${page}&limit=${limit}`)
    .then((r) => r.json());

  setItems(updated.products || []);
  setPages(updated.pages || 1);

  setEditingId(null);
  resetForm();
    } else {
      alert("❌ Failed to save product");
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      image1: "",
      image2: "",
      image3: "",
      priceRange: "",
      bottlePrice: "",
      cartonPrice: "",
      sku: "",
      categoryIds: [],
      alcVol: "",
      bottlesPerCarton: "",
    });
  };

  // ✅ Filter products
  const filteredItems = items.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const sku = product.sku?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      sku.includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      product.categories?.some(
        (link: any) => link.category.id === selectedCategory
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* 🔍 Search + Filter */}
      <div
        style={{
          marginBottom: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 📝 Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
            gap: "8px",
            marginBottom: "2rem",
          }}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="image1"
            value={form.image1}
            onChange={handleChange}
            placeholder="Image 1 URL"
          />
          <input
            name="image2"
            value={form.image2}
            onChange={handleChange}
            placeholder="Image 2 URL"
          />
          <input
            name="image3"
            value={form.image3}
            onChange={handleChange}
            placeholder="Image 3 URL"
          />
          <input
            name="priceRange"
            value={form.priceRange}
            onChange={handleChange}
            placeholder="Price Range (e.g. 12,000 - 74,000)"
          />
          <input
            name="bottlePrice"
            type="number"
            value={form.bottlePrice}
            onChange={handleChange}
            placeholder="Bottle Price"
          />
          <input
            name="cartonPrice"
            type="number"
            value={form.cartonPrice}
            onChange={handleChange}
            placeholder="Carton Price"
          />
          <input
            name="bottlesPerCarton"
            type="number"
            value={form.bottlesPerCarton}
            onChange={handleChange}
            placeholder="Bottles Per Carton"
          />
          <input
            name="alcVol"
            value={form.alcVol}
            onChange={handleChange}
            placeholder="Alcohol Vol."
          />
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
          />

          {/* ✅ Fixed Multi-select Categories with typing */}
          <Select
            isMulti
            name="categoryIds"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            value={categories
              .filter((cat) => form.categoryIds.includes(cat.id))
              .map((cat) => ({ value: cat.id, label: cat.name }))}
            onChange={(selectedOptions) =>
              setForm({
                ...form,
                categoryIds: selectedOptions.map((opt) => opt.value),
              })
            }
            placeholder="Select Categories..."
          />

          <button type="submit" style={{height:'40px', cursor:'pointer'}}>
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          )}
        </form>

        {/* 🧾 Product List */}
        <div style={{width:'90%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h2>Admin Products</h2>
          {/* <h3>Total Products: {items.length}</h3> */}
          <br/>
          <input placeholder="Filter Product"/>
          <br/>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent:"center",
              listStyleType:"none"
            }}
          >
            {filteredItems.map((product) => (
              <li
                key={product.id}
                style={{
                  width: "250px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.image1}
                  width={200}
                  height={200}
                  alt={product.name}
                  style={{ borderRadius: "8px" }}
                />
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>Alc/Vol: {product.alcVol}</p>
                <p>SKU: {product.sku}</p>
                <p>₦{product.bottlePrice.toLocaleString()} (Bottle)</p>
                <p>₦{product.cartonPrice.toLocaleString()} (Carton)</p>
                <p>
                  Categories:{" "}
                  {product.categories
                    ?.map((link: any) => link.category.name)
                    .join(", ") || "—"}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={async () => {
                      await fetch(`/api/products/${product.id}/stock`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ inStock: !product.inStock }),
                      });
                      window.location.reload();
                    }}
                    style={{
                      background: product.inStock ? "#4CAF50" : "#F44336",
                      color: "#fff",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {product.inStock ? "Set Out of Stock" : "Set In Stock"}
                  </button>

                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* PAGINATION */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{ padding: "8px 14px", cursor: page === 1 ? "not-allowed" : "pointer" }}
            >
              ⬅ Prev
            </button>

            {/* Numbered pages */}
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: "8px 14px",
                  background: p === page ? "#000" : "#ddd",
                  color: p === page ? "#fff" : "#000",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              style={{ padding: "8px 14px", cursor: page === pages ? "not-allowed" : "pointer" }}
            >
              Next ➡
            </button>
          </div>

        </div>
      </div>
    </>
  );
}