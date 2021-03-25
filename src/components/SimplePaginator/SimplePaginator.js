import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { getUrlParams } from '../../services/global';

const SimplePaginator = ({ onPage, pages, _page = 0 }) => {
  const location = useLocation();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [countPages, setCountPages] = useState(pages);
  const [interval, _] = useState(5);
  const [arrPages, setArrPages] = useState([]);

  const {page: locationPage = 1 } = getUrlParams(location);

  useEffect(() => {
    setCountPages(pages);
    setArrPages(()=>{
      const arr = [];
      let arrLength = pages>interval?interval:pages;
      for (let i = 1; i <= arrLength; i++) {
        arr.push(i); 
      }
      return arr;
    })
  }, [pages]);

  useEffect(()=>{
    //console.log('locationPage = ', locationPage);
    setPage(Number(locationPage));
  }, [location]);

  useEffect(() => {
    //console.log('SimplePaginator page = ', page);
    setArrPages(()=>{
      const arr = [];
      let correctEnd = 0;
      let correctStart = 0;
      let start = page - 2;
      //console.log(start);
      if(start<1){
        correctEnd = 1 + Math.abs(start);
        start = 1;
        //console.log('Math.abs(start) = ', Math.abs(start));
      }
      //console.log('correctEnd = ', correctEnd);
      //let start = page - 2>1?page-2:1;
      let end = page+2>countPages?countPages:page+2;

      //console.log(end);
      //console.log(end-start);

      if(end-start<4 && correctEnd<=0){
        //console.log('correctStart = ',end-start-3);
        correctStart = 1 + Math.abs(end-start-3);
      }
      //start = end-start<3?start-1:start;
      end = end+correctEnd;
      start = start - correctStart<=0?1:start - correctStart;
      let arrLength = end>countPages?countPages:end;
      for (let i = start; i <= arrLength; i++) {
        arr.push(i); 
      }
      return arr;
    });
    calback(page);
  }, [page]);

  useEffect(()=>{
    
    if(_page<=0){
      return;
    }

    let p = _page;
    if(_page<1){
      p = 1;
      return;
    }

    if(_page>countPages){
      p = countPages;
      return;
    }
    //console.log('calback = ', _page);
    //setPage(p);
    calback(p);
  }, [_page]);

  const calback = (p)=>{
    if(p<=0){
      return;
    }
    history.push(`?page=${p}`);
    if(typeof onPage==='function'){
      onPage(p);
    }
  }

  const nextPage = ()=>{
    const p = page+1;
    if(p>countPages){
      return;
    }
    calback(p);
  };

  const prevPage = ()=>{
    const p = page-1;
    if(p<1){
      return;
    }
    calback(p);
  };

  const handlerClickPage = (p)=>{
    if(p===page){
      return;
    }
    calback(p);
  }

  return (
    <React.Fragment>
      {pages>1?
        <Pagination>
          <Pagination.First onClick={()=>handlerClickPage(1)}/>
          <Pagination.Prev onClick={prevPage}/>
          { interval<countPages && page>3?
            <React.Fragment>
              <Pagination.Item onClick={()=>handlerClickPage(1)}>{1}</Pagination.Item>
              <Pagination.Ellipsis disabled />
            </React.Fragment>:
            null
          }

          {
            arrPages.map((el)=>{
              let active = false;
              if(el===page){
                active = true;
              }
              return <Pagination.Item key={el} active={active} onClick={()=>handlerClickPage(el)}>{el}</Pagination.Item>
            })
          }

          { interval<countPages && page+2<countPages?
            <React.Fragment>
              <Pagination.Ellipsis disabled />
              <Pagination.Item onClick={()=>handlerClickPage(countPages)}>{countPages}</Pagination.Item>
            </React.Fragment>:
            null
          }
          <Pagination.Next onClick={nextPage}/>
          <Pagination.Last onClick={()=>handlerClickPage(countPages)}/>
        </Pagination>:
        null
      }
    </React.Fragment>

  );
}

export default SimplePaginator;