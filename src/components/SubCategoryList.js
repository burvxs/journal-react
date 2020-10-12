import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SUBLIST_GET_URL, SUBLIST_CREATE_URL} from '../constants'

const SubCategoryList = (props) => {
    const [list, setList] = useState([]);
    const [listText, setListText] = useState([]);

    const fetchSubList = () => {
        axios.get(SUBLIST_GET_URL)
        .then((res) => {
            console.log(res.data);
            setList(res.data["sub_list"]);
        })
        .catch((err) => {
            console.warn(err);
        });
    }

    useEffect(() => {
        fetchSubList();
    }, []);

    const handleClick = (e) => {
        props.history.push(`/category_sub_list/${props.match.params["category_id"]}/${e.target.id}`)
    }

    const renderList = () => {
        const renderingList = list.filter((item) => {
            console.log(item)
            return parseInt(item["category_id"]) === parseInt(props.match.params.category_id);
        })
        console.log(renderingList);
        return renderingList.map((item) => {
          return (
            <li onClick={handleClick} key={item.id} id={item.id}>
              {item.title}
            </li>
          );
        });
    };

    const submitList = (e) => {
        if(e.keyCode === 13){
            axios.post(SUBLIST_CREATE_URL, {
                title: listText,
                category_id: props.match.params["category_id"]
            })
            .then(res => {
                setList([...list, res.data])
            })
            .catch(err => {
                console.warn(err);
            })
        }
    }

    return (
      <div className="sublistWrapper">
        <h3>Your lists</h3>
        <ul>
          <li>
            <input
                type="text"
                onKeyDown={submitList}
                onChange={(e) => setListText(e.target.value)}
                placeholder="Create a list"
            />
          </li>
          {renderList()}
        </ul>
      </div>
    );
}

export default SubCategoryList;
