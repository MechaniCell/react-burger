import styles from '../feed-details/feed-details.module.css';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { convertDate } from '../../pages/feed-page';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/action-types';
import { useAppDispatch, useAppSelector } from '../..';

const FeedOrderDetails: FC<any> = ({ item }): any => {
const { data } = useAppSelector(store => store.data);
const orderIngredients = data.filter((i: any) => item.ingredients.includes(i._id))

return (orderIngredients.map((i: any) => 
  <div key={uuidv4()} className={styles.feed_details_sum_icon_container}>
    <img className={styles.round_ingredients_container} src={i.image_mobile} alt={ i.name } />    
    <p className={`${styles.feed_name_container} text text_type_main-small ml-4`}>{i.name}</p>
    <div className={`${styles.feed_sum_container} ml-4`}>
      <p className="text text_type_digits-default mr-2">{i.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  </div>
 ))
}  

export default function FeedDetails() {
const dispatch = useAppDispatch() 
const { path } = useRouteMatch();
const { getResult } = useAppSelector(store => store.profile);
const { loginResult } = useAppSelector(store => store.login);
const { id } = useParams<{id: string}>()  
const { data } = useAppSelector(store => store.data)  
const { orders } = useAppSelector(store => store.orders);    

useEffect(() => {
if (data) {
  dispatch({type: WS_CONNECTION_START, payload: 'orders/all'})
} else {
    dispatch({type: WS_CONNECTION_CLOSED})
}
}, [dispatch, getResult, loginResult, path]);
    
return (<div>{
    orders.success && orders.orders.filter((item: any) => item._id === id).map((item: any) => 
<div key={uuidv4()} className={styles.main_container}>
  <div className={styles.main_feed_details_container}>
    <p className={`${styles.feed_details_number_container} text text_type_digits-default mb-10`}>#{item.number}</p> 
    <p className={`${styles.feed_details_name_container} text text_type_main-medium mb-3`}>{item.name}</p>   
    <p className="text text_type_main-small mb-15">{item.status === 'done' ? 'Выполнен' : 'Готовится' }</p>
    <p className="text text_type_main-large mb-6">Состав:</p>      
    <div className={styles.left_feed_container}>
      <FeedOrderDetails key={uuidv4()} item={item} />
    </div> 
    <div className={styles.feed_details_sum_icon_container}>
      <p className="text text_type_main-default">{convertDate(item.createdAt)}</p>
      <div className={styles.feed_sum_container}>
        <p className="text text_type_digits-default mr-2">{data.filter((i: any) => item.ingredients.includes(i._id)).map((i: any) => i.price).reduce((sum: number, item: number ) => sum += item,0)}</p>
        <CurrencyIcon type="primary" />
      </div> 
    </div>
  </div>  
</div> 
)}</div>) 
}