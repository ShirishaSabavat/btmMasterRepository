import React, { useEffect, useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import {Alert} from "reactstrap"
import {Trash, Eye, AlertCircle} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { fetchAllUsersData, deleteUser } from "../../../redux/actions/user/index"
import TableDataLoadingSkleton from '../../../components/skleton/TableDataLoadingSkleton'
import OrganizationChart from "@dabeng/react-orgchart"

const traverseTree = []
// let traverseTreeFull = []

const MlmTree = () => {

    const dispatch = useDispatch()
    
    // const usersData = useSelector(state => state.user.users.map(i => ({_id: i._id, name: i.name, rank: i.rank, referral: i.referral, referralCode: i.referralCode})))
    const usersData = useSelector(state => state.user.users.sort((a, b) => parseInt(a.referralCode?.split('-')[2]) - parseInt(b.referralCode?.split('-')[2])))
    const loading = useSelector(state => state.common.loading)
    
    const [showDelete, setShowDelete] = useState(false)
    const [treeData, setTreeData] = useState([])

    useEffect(() => {
        dispatch(fetchAllUsersData())
    }, [])

    useEffect(() => {
        // buildTree()
        usersData.reverse().map(i => {
            // if (traverseTree.find(k => k.id === i._id)) {
                // return
            // }
            // const hasChilds = usersData.filter(j => j.referral === i.referralCode)[0]
            // if (hasChilds) {
                // traverseTree.push({id: i._id, name: i.name, title: i.rank, children: buildTree()})
                // return
            // }
            if (traverseTree && i.referral === 'DIRECT') {
                // traverseTree.push({id: i._id, name: i.name, title: i.rank, children: []})
                return
            }
            if (traverseTree[i.referralCode]) {
                console.log(i.name)
                console.log(traverseTree[i.referralCode])
                traverseTree[i.referral] = [{id: i._id, name: i.name, title: i.rank, children: [...traverseTree[i.referralCode]]}]
                delete traverseTree[i.referralCode]
                return
            }
            if (traverseTree[i.referral]) {
                traverseTree[i.referral] = [...traverseTree[i.referral], {id: i._id, name: i.name, title: i.rank, children: []}]
                return
            }
            traverseTree[i.referral] = [{id: i._id, name: i.name, title: i.rank, children: []}]
        })

        // traverseTree = traverseTree.DIRECT

        // console.log(traverseTree)
        // console.log(usersData)
    }, [usersData])

    if (loading || !usersData || !traverseTree) {
        return (<TableDataLoadingSkleton />)
    }

    return (
        <div>
            <Alert color='info' isOpen={true}>
                <div className='alert-body'>
                <AlertCircle size={15} />{' '}
                <span className='ml-1'>
                    Scroll horizontall and vertically to view the full tree view
                </span>
                </div>
            </Alert>

            <div style={{padding: 10}}>
                <OrganizationChart datasource={{
                    id: "businessaacharya",
                    name: "Business Aacharya",
                    title: "",
                    children: traverseTree['BAC-A02-0001']
                }} />
            </div>
        </div>
    )

}

export default MlmTree