import { useEffect, useRef, useState } from "react";

const initialForm = {
  product_name: "",
  product_description: "",
  packaging: "",
  price_per_pack: "",
  availability: "Available",
  is_featured: false,
};

export default function ProductForm({
  product,
  onSubmit,
  onClose,
  submitting,
  formError,
  onDeleteImage,
  deletingImageId,
  deletingAllImages,
})  {
  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const fileInputRef = useRef(null);

useEffect(() => {
  setFormData(
    product
      ? {
          product_name: product.product_name ?? "",
          product_description: product.product_description ?? "",
          packaging: product.packaging ?? "",
          price_per_pack: product.price_per_pack ?? "",
          availability: product.availability ?? "Available",
          is_featured: product.is_featured ?? false,
        }
      : initialForm,
  );

  setImages([]);
  setImagePreviews([]);
  setExistingImages(product?.images || []);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
}, [product]);
  function closeModal() {
    if (submitting) return;

    onClose();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const selectedFiles = Array.from(event.target.files || []);

    setImagePreviews((previous) => {
      previous.forEach((preview) => URL.revokeObjectURL(preview.url));

      return selectedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
    });

    setImages(selectedFiles);
  }

  function removeImage(index) {
    const preview = imagePreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index),
    );

    setImagePreviews((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index),
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.product_name.trim()) {
      onSubmit(null, "Please enter a product name.");
      return;
    }

    if (!formData.product_description.trim()) {
      onSubmit(null, "Please enter a product description.");
      return;
    }

    if (!formData.packaging.trim()) {
      onSubmit(null, "Please enter the packaging details.");
      return;
    }

    if (
      formData.price_per_pack === "" ||
      !Number.isFinite(Number(formData.price_per_pack)) ||
      Number(formData.price_per_pack) < 0
    ) {
      onSubmit(null, "Please enter a valid, non-negative price.");
      return;
    }

    if (!product && images.length === 0) {
      onSubmit(null, "Please select at least one product image.");
      return;
    }

    const body = new FormData();

    body.append("product_name", formData.product_name.trim());
    body.append("product_description", formData.product_description.trim());
    body.append("packaging", formData.packaging.trim());
    body.append("price_per_pack", formData.price_per_pack);
    body.append("availability", formData.availability);
    body.append("is_featured", String(formData.is_featured));

    const imageData = new FormData();

    images.forEach((image) => {
      imageData.append("images", image);
    });

    await onSubmit({
      productData: body,
      imageData,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-product-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#FAF5EB] p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A7833E]">
              Product Management
            </p>

            <h2
              id="add-product-title"
              className="mt-2 font-serif text-3xl font-semibold text-[#44352D]"
            >
              {product ? "Edit Product" : "Add a Product"}
            </h2>

            <p className="mt-2 text-sm text-[#44352D]/65">
              Enter the product details and upload its images.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={submitting}
            aria-label="Close modal"
            className="rounded-full px-3 py-1 text-2xl text-[#44352D]/60 hover:bg-[#F1E7D5] hover:text-[#44352D] disabled:opacity-40"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          {/* Product Name */}
          <div>
            <label
              htmlFor="product_name"
              className="mb-2 block text-sm font-medium text-[#44352D]"
            >
              Product Name *
            </label>

            <input
              id="product_name"
              name="product_name"
              type="text"
              value={formData.product_name}
              onChange={handleInputChange}
              required
              maxLength={150}
              placeholder="e.g. Labania"
              className="w-full rounded-xl border border-[#44352D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A7833E]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="product_description"
              className="mb-2 block text-sm font-medium text-[#44352D]"
            >
              Description *
            </label>

            <textarea
              id="product_description"
              name="product_description"
              value={formData.product_description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe the product..."
              className="w-full resize-y rounded-xl border border-[#44352D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A7833E]"
            />
          </div>

          {/* Packaging */}
          <div>
            <label
              htmlFor="packaging"
              className="mb-2 block text-sm font-medium text-[#44352D]"
            >
              Packaging *
            </label>

            <input
              id="packaging"
              name="packaging"
              type="text"
              value={formData.packaging}
              onChange={handleInputChange}
              required
              placeholder="e.g. Box of 12 pieces"
              className="w-full rounded-xl border border-[#44352D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A7833E]"
            />
          </div>

          {/* Price and Availability */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price_per_pack"
                className="mb-2 block text-sm font-medium text-[#44352D]"
              >
                Price per Pack (KSh) *
              </label>

              <input
                id="price_per_pack"
                name="price_per_pack"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_per_pack}
                onChange={handleInputChange}
                required
                placeholder="Enter price"
                className="w-full rounded-xl border border-[#44352D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A7833E]"
              />
            </div>

            <div>
              <label
                htmlFor="availability"
                className="mb-2 block text-sm font-medium text-[#44352D]"
              >
                Availability *
              </label>

              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-[#44352D]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#A7833E]"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Featured Product */}
          <div className="rounded-xl border border-[#D8C7A4] bg-[#F1E7D5]/50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    is_featured: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 accent-[#A7833E]"
              />

              <span>
                <span className="block text-sm font-semibold text-[#44352D]">
                  Feature on Homepage
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#44352D]/65">
                  Display this product in the Featured Products section on your
                  homepage.
                </span>
              </span>
            </label>
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="product_images"
              className="mb-2 block text-sm font-medium text-[#44352D]"
            >
              {product ? "Manage Product Images" : "Product Images *"}
            </label>

            {/* Existing Images */}
            {product && (
              <div className="mb-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#44352D]">
                    Current Images ({existingImages.length})
                  </p>

                  {existingImages.length > 0 && (
                    <button
                      type="button"
                      disabled={
                        submitting ||
                        deletingAllImages ||
                        deletingImageId !== null
                      }
                      onClick={() => onDeleteImage(null)}
                      className="text-xs font-medium text-red-700 hover:underline disabled:opacity-50"
                    >
                      {deletingAllImages ? "Deleting..." : "Delete All Images"}
                    </button>
                  )}
                </div>

                {existingImages.length === 0 ? (
                  <p className="rounded-xl bg-[#F1E7D5] p-4 text-sm text-[#44352D]/70">
                    This product has no saved images. Upload an image below.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.image_url}
                          alt={`${product.product_name} product`}
                          className="aspect-square w-full rounded-xl object-cover"
                        />

                        {image.is_primary && (
                          <span className="absolute left-2 top-2 rounded-full bg-[#44352D] px-2 py-1 text-xs text-white">
                            Primary
                          </span>
                        )}

                        <button
                          type="button"
                          disabled={
                            submitting ||
                            deletingAllImages ||
                            deletingImageId !== null
                          }
                          onClick={() => onDeleteImage(image.id)}
                          className="mt-2 text-xs font-medium text-red-700 hover:underline disabled:opacity-50"
                        >
                          {deletingImageId === image.id
                            ? "Deleting..."
                            : "Delete Image"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Select New Images */}
            <input
              ref={fileInputRef}
              id="product_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full rounded-xl border border-[#44352D]/15 bg-white p-3 text-sm text-[#44352D] file:mr-4 file:rounded-full file:border-0 file:bg-[#44352D] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />

            <p className="mt-2 text-xs text-[#44352D]/55">
              {product
                ? "Select additional images and click Save Changes to upload them."
                : "Select one or more images. The first image will be the primary product image."}
            </p>

            {/* New Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {imagePreviews.map((preview, index) => (
                  <div key={preview.url} className="relative">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="aspect-square w-full rounded-xl object-cover"
                    />

                    {!product && index === 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-[#44352D] px-2 py-1 text-xs text-white">
                        Primary
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={submitting}
                      className="mt-2 text-xs font-medium text-red-700 hover:underline disabled:opacity-50"
                    >
                      Remove Selected Image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Error */}
          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {formError}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#44352D]/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              className="rounded-full border border-[#44352D]/20 px-6 py-3 text-sm font-medium text-[#44352D] hover:bg-[#F1E7D5] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#362419] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? product
                  ? "Saving Changes..."
                  : "Adding Product..."
                : product
                  ? "Save Changes"
                  : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
