import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import users from '../../../public/image/users.jpg'
import { CloseOutlined } from "@ant-design/icons";
import styles from './style.module.css'
 
const { Search } = Input;
 
const dataSource = [
    {
      key: '1',
      
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '2',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
    {
      key: '3',
      applicationId: '12345678',
      customerName: 'Bashar Islam',
      email: 'abc@email.com',
      address: 'Dhaka Bangladesh',
      date: '16 Apr 2024',
      phone:'4536656'
    },
]
const BidHistory = () => {
 
    const [isModalOpen, setIsModalOpen] = useState(false);

 
// const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
 
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) => index + 1,
    },
    {
        title: "User Name",
        dataIndex: "User Name",
        key: "User Name",
        render: (_, record) => (
          // <p>{(record?.email) ?  record?.email : "00"}$</p>
          <p>absayed</p>
        )
      },
    {
      title: "Business-Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <div>

          <img
            className="w-[34px] h-[34px] rounded-full"
            src={users}
            alt=""
          />
          </div>
          <div>

          {/* <p className="font-medium">{record?.customerName}</p> */}
          <p className="font-medium">Business Name</p> 
          <p className="text-xs">abu@yaho.com</p>
          </div>
        </div>
      ),
    },
   
    {
      title: "BidStatus",
      dataIndex: "BidStatus",
      key: "BidStatus",
      render: (_, record) => (
        // <p>{(record?.email) ?  record?.email : "00"}$</p>
        <p>win</p>
      )
    },
    {
      title: "LastPrice",
      dataIndex: "LastPrice",
      key: "LastPrice",
      render: (_, record) => (
        // <p>{(record?.email) ?  record?.email : "00"}$</p>
        <p>$35</p>
      )
    },
   
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => (
        // <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
        <p>34/04/24</p>
      )
    },
    // {
    //   title: "Feedback",
    //   dataIndex: "Feedback",
    //   key: "Feedback",
    //   render: (_, record) => (
    //     // <p>{(record?.email) ?  record?.email : "00"}$</p>
    //     <p className="text-[#1E66CA]">Send Feedback</p>
    //   )
    // },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         
            <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" />
          
          {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
        </Space>
      ),
    },
  ];
  
  const handleView = () => {
    // setUser(value);
    // console.log(value)
    setIsModalOpen(true);
  };
//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//   };
//   console.log(user);
//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//     console.log(page);
//   };
const onSearch = (value, _e, info) => console.log(info?.source, value);
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
  return (
    <div className="">
       
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
          <div>

          <p className="text-header">Trainer</p>
          </div>
          <div>
          <Space direction="vertical">
    <DatePicker onChange={onChange} />
   
  </Space>
          <Search style={{
            width:"200px",
            marginLeft:'4px'
          }} placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
        </div>
        <Table
       pagination={{
        total: dataSource.length,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 1,
        showSizeChanger: false,
        itemRender: (current, type, originalElement) => {
          if (type === 'prev') {
            return <Button className={styles.paginationButton}>Back</Button>;
          }
          if (type === 'next') {
            return <Button className={styles.paginationButton}>Next</Button>;
          }
          return originalElement;
        },
        className: styles.paginationCenter,
      }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white", // Icon color
              backgroundColor: "#de0a26", // Background color of the close icon
              borderRadius: "10%", // Rounded background
              padding: "10px", // Padding inside the background
            }}
          />
        }
      >
      
      <div>
        <div  className="flex justify-center items-center gap-2 py-4 flex-col border-b border-b-gray-300">
           <h1 className="text-xl font-medium">Trainer Details</h1>
        </div>
        <div  className="p-[20px]">
        <div className="flex justify-between border-b py-[16px]">
            <p>Full Name:</p>
            <p>
              {/* {user?.name ? user?.name : "N/A"} */}
              absayed
            </p>
          </div>
        
         
          <div className="flex justify-between border-b py-[16px] ">
            <p>Email:</p>
            <p>
              {/* {user?.email ? user?.email : "N/A"} */}
              ab@gmail.com
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Phone:</p>
            <p>
              {/* {user?.phone ? user?.phone : "N/A"} */}
              +45269875
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Date:</p>
            <p>
              {/* {user?.createdAt  ? user?.createdAt?.split("T")[0] : "N/A"} */}
              23-11-24
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <p>address:</p>
            <p className="px-[15px] py-[10px] rounded-lg">
              {/* Regular P550 */}
              UK
            </p>
          </div>

        </div>
      </div>
      </Modal>
    </div>
  );
};

export default BidHistory;
