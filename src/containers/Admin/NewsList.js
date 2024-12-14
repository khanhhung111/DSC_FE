  import { useEffect, useState } from 'react';
  import Popup from 'reactjs-popup';
  import moment from 'moment';

  import helloAdmin from '../../assets/helloAdmin.png';
  import { getAllNews } from '../../utils/admin';
  import NewDetail from './Detail/NewDetail';
  import BaseButton from '../../components/Button';

  const HEADER_TABLE = ['Stt', 'Title', 'Name of Staff', 'Date of Public', ''];

  const HeaderTable = HEADER_TABLE.map((header, index) => (
    <th className='border-b border-gray-300 bg-slate-200 py-3' key={`${header}`}>
      <div className={`${index < 2 && 'ml-2'} flex`}>{header}</div>
    </th>
  ));

function NewsList() {
  const [newsList, setNewsList] = useState([]); // Initialize the news list state

  
    const [newsDetail, setNewsDetail] = useState({});
    const [selectedNews, setSelectedNews] = useState({});
    const [displayPopup, setDisplayPopup] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  
  // const handleCreateNews = (newNews) => {
  //   setNewsList([...newsList, newNews]);
  // };
    const BodyTable = () =>
      newsList.map((news, index) => (
        <BodyTableRow
          key={index}
          newid={news.id}
          title={news.title}
          staffId={news.manager_id}
          datePublic={moment(news.datePublic).format('DD-MM-YYYY')}
          handleDisplayDetail={handleDisplayDetail}
          editorValue={news.content}
        />
      ));
    const handleCreate = () => {
      setDisplayPopup(true);
      setIsCreate(true);
      setIsEditing(false)
  };
  useEffect(() => {
    // Call the API and set the data into newsList when the component is rendered
    getAllNews()
      .then((response) => {
        setNewsList(response.data); // Assuming the response is an array of news data
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
      });
  }, [displayPopup]);

    useEffect(() => {
      if (!displayPopup) {
        setIsCreate(false);
      }
    }, [displayPopup]);
  // console.log('contentValue', contentValue);
  const handleDisplayDetail = (id) => {
    // console.log('newwList []', newsList[id-1]);
    // console.log('id', id);
    const selectedNews = newsList.find((item) => item.id === id);
    setSelectedNews(selectedNews);
    console.log('selectedNews', selectedNews);    
    setIsEditing(true);
    setDisplayPopup(true)
  };
  // console.log('newSlected',selectedNews);
  // console.log('isCreate', isCreate);
  // console.log('newsList', newsList);
  // console.log('selectNew', selectedNews);
    return (
      <div>
        <img src={helloAdmin} />
        <div className='w-full flex justify-center items-center py-4'>
          <BaseButton content='Create' className={`rounded-3xl bg-[#C7923E] font-medium w-32`} onClick={handleCreate} />
        </div>
        <div className='flex justify-center w-full mt-4'>
          <table className='w-[98%] bg-white border border-gray-300'>
            <thead>
              <tr className='border border-gray-300 '>{HeaderTable}</tr>
            </thead>
            {newsList.length > 0 && <BodyTable />}
          </table>
        </div>
        <Popup
          open={displayPopup}
          onClose={() => displayPopup && setDisplayPopup(false)}
          modal
          {...{
            contentStyle: { width: '80%', borderRadius: 4, padding: 20 },
          }}
          className='popup-editor'
        >
          <div>
            <div className='content'>
              <NewDetail
                isCreate={isCreate}
                setDisplayPopup={setDisplayPopup}
                // createNews={handleCreateNews}
                selectedNews={selectedNews}
                newsList={newsList}
                isEditing={isEditing}
              />
            </div>
            {/* <div className='w-full flex justify-center mt-4'>
                <button className='bg-blue-500 text-white px-4 py-1 rounded-sm' onClick={() => setDisplayPopup(false)}>
                  OK
                </button>
              </div> */}
          </div>
        </Popup>
      </div>
    );
  }

  const BodyTableRow = ({
    newid,
    title,
    content,
    managerID,
    datePublic,
    handleDisplayDetail,
    staffId,
    editorValue,
  }) => {
    return (
      <tbody>
        <tr>
          <td className='py-3 border-b border-gray-300 pl-2'>{newid}</td>
          <td className='py-3 border-b border-gray-300 pl-2 font-bold'>{title}</td>
          <td className='py-3 border-b border-gray-300 pl-2'>{staffId}</td>
          {/* <td className='py-3  border-b border-gray-300 pl-2' dangerouslySetInnerHTML={{ __html: editorValue }}></td> */}
          <td className='py-3 border-b border-gray-300'>{datePublic}</td>
          <td className='py-3 border-b border-gray-300' onClick={() => handleDisplayDetail(newid)}>
            <button className='hover:bg-blue-100 text-blue-700 rounded-full text-xs ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    );
  };

  export default NewsList;
