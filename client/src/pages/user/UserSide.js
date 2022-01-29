import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardDatas from '../../components/UserComponent/Card/CardDatas'
import NewCardDatas from '../../components/UserComponent/Card/NewCardDatas';
import CardPost from '../../components/UserComponent/Card/CardPost';
import Cards from '../../components/UserComponent/Card/Cards';
import SearchBox from '../../components/UserComponent/SearchBox/SearchBox';
import './userside.css';
import ReactPaginate from 'react-paginate';
import { AiOutlineInsertRowBelow, AiOutlineBlock } from 'react-icons/ai';
import { MdOutlineTableRows } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import th from 'date-fns/locale/th';

import { getPerson } from '../../functions/person';
import { toast } from 'react-toastify';
import { Table, Avatar, Image, Switch } from 'antd';
import { DeleteOutlined, VerifiedOutlined } from '@ant-design/icons';
import { AiOutlineVerticalAlignBottom} from "react-icons/ai";
import { removePerson } from '../../functions/person';
import DownloadLink from "react-download-link";


function UserSide() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchNo, setSearchNo] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    loadPerson(user.token);
  }, [])

  const loadPerson = (authtoken) => {
    getPerson(authtoken)
        .then((res) => {
            setPerson(res.data)
            console.log(res.data)
        }).catch((err) => {
            toast.error(err)
            console.log(err)
        })
}



 


  registerLocale('th', th)

  function Greeting(props) {
    const isLoggedIn = props.onChangeSwitch;
    if (isLoggedIn) {
      return         <div><PaginatedItems itemsPerPage={12} />
      {cardPost}</div>;
    }
    return  <div><Table columns={columns} dataSource={person} rowKey="_id" className="upload-table"/></div>;
  }

  const handleRemove = (id) => {
    if (window.confirm("คุณแน่ใจว่าจะลบไฟล์!")){
        setLoading(true);
        removePerson(id, user.token)
            .then(res=>{
                loadPerson(user.token);
                setLoading(false)
                toast.success('ลบไฟล์ '+ res.data.name + ' สำเร็จ ')
            }).catch(err=>{
                setLoading(false)
                toast.error(err.response)
            })
    }
}
function onChangeSwitch(checked) {
  console.log(`switch to ${checked}`);
}

  function onCardOpenClick(theCard){
    setSelectedCard(theCard);
  }

  function onCardCloseClick(){
    setSelectedCard(null);
  }

  const filteredCards = person.filter((CardData) => CardData.name.includes(searchText)).filter((CardData) => CardData.locate.includes(searchNo))

  const cardElements = filteredCards.map((CardData, index) => {
      return <Cards key={index} CardData={CardData} onCardClick={onCardOpenClick}/>;
  });

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((cardElements) => (
            <div>
              {cardElements}
            </div>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
 
  
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(cardElements.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(cardElements.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % cardElements.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

  
    return (
      <><div className="app-grid">
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName={"paginationBttns"}
          previousClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
        />
        </div>

      </>
    );
  }

  const columns = [

    {
        title: 'วันที่',
        dataIndex: 'dateFirst',
        key: 'dateFirst'
    },
    {
        title: 'เลขรับ',
        dataIndex: 'numTo',
        key: 'numTo'
    },
    {
        title: 'ที่',
        dataIndex: 'locate',
        key: 'locate'
    },
    {
        title: 'ลงวันที่',
        dataIndex: 'dateGen',
        key: 'dateGen'
    },
    {
        title: 'จาก',
        dataIndex: 'from',
        key: 'from'
    },
    {
        title: 'ถึง',
        dataIndex: 'to',
        key: 'to'
    },
    {
        title: 'Download',
        render: (record) => (
            <DownloadLink className="button-field-download"  filename={record.pic} label="Download" >
               
                <AiOutlineVerticalAlignBottom className="button-icon-download"/>          
                <div className="button-text-download">
                ดาวน์โหลด</div>
            </DownloadLink>
        )
    },
    {
        title: 'เรื่อง',
        dataIndex: 'name',
        key: 'name'
    }

]
  


   
  

  let cardPost = null;
  if(!!selectedCard){
    cardPost = <CardPost CardData={selectedCard} onBgClick={onCardCloseClick}/>
  }

  return (
    <div >
      <div className="searh">
        <div className="search2">ใส่คำค้นหา<SearchBox value={searchText} onValueChange={setSearchText} placeholder="คำค้นหา"/></div>
        <div className="search3">เลขที่หนังสือ<SearchBox value={searchNo} onValueChange={setSearchNo} placeholder="เลขที่หนังสือ"/></div>
        <div className="search4"><DatePicker elected={startDate} onChange={(date) => setStartDate(date)} locale="th" /></div>
        <div className="chblog"><Switch defaultChecked onChange={onChangeSwitch} /></div>
      </div> 
      <PaginatedItems itemsPerPage={12} />
      {cardPost}
    </div>
    
  )
}

export default UserSide
