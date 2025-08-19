import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] pb-[110px]">
      
      {/* Sidebar Filters */}
      <div className={`md:w-[20%] w-full md:min-h-screen border-r border-gray-600 text-[#aaf5fa] px-5 py-4 
        ${showFilter ? "h-auto" : "h-[60px]"} md:block`}>
        
        {/* Filter Header (Mobile Toggle) */}
        <p
          className="text-[22px] font-semibold flex items-center justify-between cursor-pointer md:cursor-default"
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          <span className="md:hidden">
            {!showFilter ? <FaChevronRight /> : <FaChevronDown />}
          </span>
        </p>

        {/* Category Filter */}
        <div className={`mt-5 space-y-2 border rounded-md bg-slate-700 p-4 overflow-y-auto max-h-[180px]
          ${showFilter ? "block" : "hidden"} md:block`}>
          <p className="text-[18px] font-medium text-white">CATEGORIES</p>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
          </label>
        </div>

        {/* SubCategory Filter */}
        <div className={`mt-5 space-y-2 border rounded-md bg-slate-700 p-4 overflow-y-auto max-h-[180px]
          ${showFilter ? "block" : "hidden"} md:block`}>
          <p className="text-[18px] font-medium text-white">SUB-CATEGORIES</p>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'TopWear'} onChange={toggleSubCategory} /> TopWear
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'BottomWear'} onChange={toggleSubCategory} /> BottomWear
          </label>
          <label className="flex gap-2 items-center">
            <input type="checkbox" value={'WinterWear'} onChange={toggleSubCategory} /> WinterWear
          </label>
        </div>
      </div>

      {/* Products Section */}
      <div className="md:w-[80%] w-full px-4 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            className="bg-slate-700 w-[200px] h-[45px] px-3 rounded-md text-white border border-gray-500"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white text-lg">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collections
