import React, {useEffect, useMemo, useState} from 'react';
import {HeaderSideBarLayout} from "../components/HeaderSideBarLayout";
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator} from "../modules/users/usesrThunk";
import {getReposThunkCreator} from "../modules/repos/reposThunk";
import styled from "styled-components";
import {Paginator} from "../components/common/pagination/Paginator";
import {clearUsers, setPageSize} from '../modules/users/usersSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import {CustomInput} from "../components/ui/CustomInput";
import {CheckBox} from '../accets/icons/CheckBox';

const UserCart = ({user}: { user: any }) => {
  const {reposes} = useSelector((state: any) => state.repos)
  const dispatch = useDispatch()
  const login = reposes?.find((repos: any) => repos?.owner?.login === user.login)
  const handleClick = () => {
    dispatch(getReposThunkCreator({user: user.login}))
  }
  const repos = useMemo(() => reposes?.map((repos: any, i: number) =>
    <LinkRep href={repos.clone_url} key={i}>
      {repos.name}
    </LinkRep>), [reposes])
  const firstLetter = user?.login?.slice(0, 1).toUpperCase()
  const restLetters = user?.login?.slice(1, user?.login.length)
  return (
    <UserCartStyles>
      <Avatar src={user?.avatar_url} alt="avatar" onClick={handleClick}/>
      <UserData>
        <Login>
          {firstLetter + restLetters}
        </Login>
        <Repos>
          {login && repos}
        </Repos>
      </UserData>
    </UserCartStyles>
  )
}

export const UsersCart = () => {
  const dispatch = useDispatch()
  const {users, pageSize, isLoaded} = useSelector((state: any) => state.issues)
  const [scrollMode, setScrollMode] = useState(false)
  console.log(scrollMode)
  const ids = users.map((user: any) => user.id)

  const handleNextPage = () => {
    const lastId = Math.max(...ids)
    if (scrollMode) {
      setTimeout(function () {
        dispatch(getUsersThunkCreator({pageSize, page: lastId}))
      }, 800);
    } else {
      dispatch(getUsersThunkCreator({pageSize, page: lastId}))
    }
  }
  const clearPage = async () => {
    await dispatch(clearUsers())
    dispatch(getUsersThunkCreator({pageSize, page: 1}))
  }

  const setOption = (option: number) => {
    dispatch(setPageSize(option))
  }

  useEffect(() => {
    users.length === 0 && dispatch(getUsersThunkCreator({pageSize: 6, page: 1}))
    // eslint-disable-next-line
  }, [scrollMode])

  const user = useMemo(() => users.map((user: any, i: number) => <UserCart key={i}
                                                                           user={user}/>
  ), [users])

  return (
    <HeaderSideBarLayout users>
      <CartHead>
        <CustomInput placeholder={`User's login`}/>
        <ScrollModeStyles>
        <span>
          Scroll Mode
        </span>
          <CheckBox setScrollMode={setScrollMode}/>
        </ScrollModeStyles>
      </CartHead>

      <InfiniteScroll
        dataLength={users.length} //This is important field to render the next data
        next={handleNextPage}
        hasMore={scrollMode}
        scrollThreshold={'500px'}
        pullDownToRefresh={true}
        refreshFunction={handleNextPage}
        loader={''}>
        <UsersCartStyles>
          {user}
        </UsersCartStyles>
      </InfiniteScroll>

      {isLoaded ? 'Loading...' : ''}
      {!scrollMode
        ? <Paginator setOption={setOption}
                     pageSize={pageSize}
                     handleNextPage={handleNextPage}
                     clearPage={clearPage} pageCount={users.length} isLoaded={isLoaded}/>
        : ''
      }
    </HeaderSideBarLayout>
  );
}

const CartHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
  grid-gap: 20px;

  div:first-child {
    width: 40%;
  }
`

const ScrollModeStyles = styled.div`
  width: 60%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 20px;
  opacity: .8;

  span {
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const UsersCartStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 10px;
  grid-gap: 20px;
`

const UserCartStyles = styled.div`
  border: 1px solid gainsboro;
  border-radius: 7px;
  background-color: gainsboro;
`

const Avatar = styled.img`
  width: 100%;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`

const UserData = styled.div`
  display: flex;
  flex-direction: column;
`

const Login = styled.span`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  cursor: default;
`

const Repos = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column-gap: 10px;
  flex-wrap: wrap;
`

const LinkRep = styled.a`
  text-decoration: none;
  font-size: 14px;

  :hover {
    color: #3076E1;
  }
`
