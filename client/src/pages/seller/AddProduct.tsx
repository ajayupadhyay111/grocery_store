import React, { useState } from "react";
import { toast } from "react-hot-toast";
import API from "../../utils/axios";


const AddProduct = () => {
  // Individual states for each field
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagesPreviews];
        newPreviews[index] = reader.result as string;
        setImagesPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validation
      if (!name || !category || !price || !offerPrice) {
        return toast.error("Please fill all required fields");
      }

      if (images.length === 0) {
        return toast.error("Please add at least one product image");
      }

      if (Number(offerPrice) > Number(price)) {
        return toast.error("Offer price cannot be greater than regular price");
      }

      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };
      const formData = new FormData();

      formData.append("productData", JSON.stringify(productData));
      // adding images to formData
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      
      await API.post("/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Product added successfully");

      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setOfferPrice("");
      setImages([]);
      setImagesPreviews(["", "", "", ""]);
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    }
  };

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Drinks",
    "Grains",
    "Bakery",
    "Instant",
  ];

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="relative"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    className="max-w-24 h-24 object-cover cursor-pointer rounded"
                    src={
                      imagesPreviews[index] ||
                      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt={imagesPreviews[index] ? "product" : "upload"}
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <textarea
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Product Description"
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              min="0"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <input
              name="offerPrice"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Offer Price"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
