import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";
import Loading from "../components/Loading";

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart, loading } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="w-full">
      {/* Main Container */}
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 px-4 lg:px-12 py-10">
        
        {/* Left: Image Section */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 w-full lg:w-1/5 justify-center">
            {[image1, image2, image3, image4].map(
              (img, idx) =>
                img && (
                  <div
                    key={idx}
                    className="w-16 h-16 md:w-20 md:h-24 lg:w-24 lg:h-28 bg-slate-300 border border-gray-400 rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setImage(img)}
                  >
                    <img
                      src={img}
                      alt="product thumb"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
            )}
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-4/5 aspect-square border border-gray-500 rounded-md overflow-hidden">
            <img
              src={image}
              alt="main product"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-white">
          <h1 className="text-2xl md:text-4xl font-semibold">
            {productData.name.toUpperCase()}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStarHalfAlt className="text-yellow-400" />
            <p className="text-sm md:text-lg font-semibold pl-2">(124)</p>
          </div>

          {/* Price */}
          <p className="text-xl md:text-3xl font-bold">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90">
            {productData.description} Stylish, breathable cotton shirt with a
            modern slim fit. Easy to wash, super comfortable, and designed for
            effortless style.
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-lg font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md transition-all ${
                    item === size
                      ? "bg-black text-[#2f97f1] text-lg"
                      : "bg-slate-300 text-black"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="w-full md:w-auto text-sm md:text-base font-medium bg-[#495b61c9] py-3 px-6 rounded-2xl mt-3 border border-gray-500 text-white shadow-md hover:bg-slate-600 transition"
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-slate-700 my-4"></div>

          {/* Extra Info */}
          <div className="space-y-1 text-sm md:text-base">
            <p>✅ 100% Original Product.</p>
            <p>💰 Cash on delivery available.</p>
            <p>🔄 Easy return & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="w-full min-h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 lg:px-20 py-10">
        <div className="flex gap-4">
          <p className="border px-5 py-2 text-white text-sm md:text-base">
            Description
          </p>
          <p className="border px-5 py-2 text-white text-sm md:text-base">
            Reviews (124)
          </p>
        </div>

        <div className="w-full md:w-4/5 lg:w-3/4 bg-[#3336397c] border text-white text-sm md:text-base lg:text-lg px-4 md:px-10 py-6 mt-4 rounded-md">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt,
          available now on OneCart. Crafted from breathable, high-quality fabric,
          it offers all-day comfort and effortless style. Easy to maintain and
          perfect for any setting, this shirt is a must-have essential.
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center text-white">
      <Loading />
    </div>
  );
}

export default ProductDetail;
