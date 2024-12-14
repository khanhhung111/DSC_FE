import { useEffect, useState } from "react";
import { Pagination } from "antd"; // Thêm Pagination của Ant Design
import helloAdmin from "../../assets/helloAdmin.png";
import moment from "moment";
import { getCustomerById, getCustomerList, searchByNameUser,updateInfoCustomer } from "../../utils/admin";
import Popup from "reactjs-popup";
import CustomerDetail from "./Detail/CustomerDetail";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HEADER_TABLE = [
  { label: "Ảnh", sortable: false,field: "avatar" },
  { label: "Họ Tên", sortable: true, field: "name" },
  { label: "Email", sortable: true, field: "gender" },
  { label: "Điện Thoại", sortable: true, field: "phone" },
  { label: "Địa Chỉ", sortable: true, field: "dob" },
  { label: "Trạng Thái", sortable: true, field: "status" },
  { label: "", sortable: false },
];

function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]); // Dữ liệu phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Số phần tử trên mỗi trang
  const [isDisplayPopup, setDisplayPopup] = useState(false);
  const [customerDetail, setCustomerDetail] = useState({});
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCustomerList()
      .then((res) => {
        const customers = res?.data?.$values || [];
        console.log("customers",customers)
        setCustomerList(customers);
        setPaginatedList(customers.slice(0, itemsPerPage)); // Cắt dữ liệu theo trang đầu tiên
      })
      .catch((err) => console.error("ERROR: ", err));
  }, []);

  useEffect(() => {
    const sortedList = [...customerList].sort((a, b) => {
      if (sortField) {
        const fieldA = a[sortField] ? a[sortField].toString().toLowerCase() : ""; // Kiểm tra null/undefined
        const fieldB = b[sortField] ? b[sortField].toString().toLowerCase() : ""; // Kiểm tra null/undefined
  
        return sortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }
      return 0;
    });
  
    setPaginatedList(sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [sortField, sortOrder, currentPage, customerList]);
  

  const handleSort = (header) => {
    if (header.sortable) {
      setSortField(header.field);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    setPaginatedList(customerList.slice(startIndex, startIndex + itemsPerPage));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          // Case when there's a search query
          const response = await searchByNameUser(searchQuery);
          
          if (response.status === 200) {
            const searchlist = response.data?.data.$values || [];
            setCustomerList(searchlist);  // Set customer list with search results
            setPaginatedList(searchlist.slice(0, itemsPerPage)); // Paginate search results
          } else {
            console.error("Failed to fetch customer list. Status:", response.status);
          }
        } else {
          // Case when searchQuery is empty
          const response = await getCustomerList();
          console.log("response", response.data.$values);
          if (response.status === 200) {
            const customers = response.data?.$values || [];
            setCustomerList(customers);  // Set customer list with full list
            setPaginatedList(customers.slice(0, itemsPerPage)); // Paginate full list
          } else {
            console.error("Failed to fetch customer list using getCustomerList");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, [searchQuery]);
  

  const handleDisplayDetail = async (customerId) => {
    try {
      const res = await getCustomerById({ customerId });
      setCustomerDetail(res.data);
    } catch (error) {
      console.error(error);
    }
    setDisplayPopup(true);
  };
  const handleSaveDetails = async (updatedDetails) => {
    // Gọi API cập nhật thông tin tại đây nếu cần
    console.log("Updated Details:", updatedDetails);
    try {
      const response = await updateInfoCustomer(updatedDetails );
      if (response.data) {
        toast.success('Cập nhật thông tin thành công');
        setDisplayPopup(false);
        const res = await getCustomerList();
        const customers = res?.data?.$values || [];
        setCustomerList(customers);  // Cập nhật lại danh sách khách hàng
        setPaginatedList(customers.slice(0, itemsPerPage));
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      toast.error('Không thể cập nhật thông tin');
    }
  
    // Cập nhật thông tin trong danh sách
    const updatedList = customerList.map((customer) =>
      customer.userId === customerDetail.userId
        ? { ...customer, ...updatedDetails }
        : customer
    );
    setCustomerList(updatedList);
    setDisplayPopup(false); // Đóng popup
  };
  

  return (
    <div className="p-4">
      <img src={helloAdmin} className="w-full mb-4 rounded-md shadow" alt="Admin" />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-1/4 mb-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
      />

      <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <table className="min-w-full border-collapse table-fixed">
  <thead>
    <tr>
      {HEADER_TABLE.map((header, index) => (
        <th
          key={header.label}
          className="text-left px-4 py-2 border-b border-gray-300 bg-gray-100 font-semibold cursor-pointer"
          onClick={() => handleSort(header)}
        >
          <div className="flex items-center">
            {header.label}
            {header.sortable && (
              <span className="ml-2">
                {sortField === header.field ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </span>
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {paginatedList.map((customer) => (
      <tr key={customer.userId} className="hover:bg-gray-50">
        <td className="px-4 py-2 border-b border-gray-300">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              customer.avatar ||
              "https://t4.ftcdn.net/jpg/02/83/34/87/360_F_283348729_wcG8rvBF5f1VfPGKy916pIcmgGk0PK7B.jpg"
            }
            alt="Avatar"
          />
        </td>
        <td className="px-4 py-2 border-b border-gray-300">{customer.fullName}</td>
        <td className="px-4 py-2 border-b border-gray-300">{customer.email || "Chưa có"}</td>
        <td className="px-4 py-2 border-b border-gray-300">{customer.phone || "Chưa có"}</td>
        <td className="px-4 py-2 border-b border-gray-300">{customer.address || "Chưa có"}</td>
        <td className="px-4 py-2 border-b border-gray-300">
          <span
            className={`px-3 py-1 rounded-full text-white ${
              customer.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {customer.status || "Chưa có"}
          </span>
        </td>
        <td className="px-4 py-2 border-b border-gray-300 text-blue-500"
            onClick={() => handleDisplayDetail(customer.userId)}>
            <button className="hover:bg-blue-100 text-blue-700 rounded-full text-xs ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={customerList.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <Popup
  open={isDisplayPopup}
  onClose={() => setDisplayPopup(false)}
  modal
>
  <CustomerDetail
    details={customerDetail}
    onSave={handleSaveDetails}
    onClose={() => setDisplayPopup(false)}
  />
</Popup>

    </div>
  );
}

export default CustomerList;
