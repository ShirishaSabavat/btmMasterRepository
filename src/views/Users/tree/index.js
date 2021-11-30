import React, { useEffect, useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import {Alert} from "reactstrap"
import {Trash, Eye, AlertCircle} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { fetchAllUsersData, deleteUser } from "../../../redux/actions/user/index"
import TableDataLoadingSkleton from '../../../components/skleton/TableDataLoadingSkleton'
import OrganizationChart from "@dabeng/react-orgchart"

const visited = []
const tree = []

const MlmTree = () => {

    const dispatch = useDispatch()
    
    // const usersData = useSelector(state => state.user.users.map(i => ({_id: i._id, name: i.name, rank: i.rank, referral: i.referral, referralCode: i.referralCode})))
    // const usersData = useSelector(state => state.user.users.filter(i => i.kycStatus === "VERIFIED").sort((a, b) => parseInt(a.referralCode?.split('-')[2]) - parseInt(b.referralCode?.split('-')[2])).reverse())
    const usersData = useSelector(state => state.user.users.filter(i => (i.referral !== "DIRECT" && i.kycStatus === "VERIFIED")).sort((a, b) => a.nodePosition - b.nodePosition).reverse())
    
    const loading = useSelector(state => state.common.loading)
    
    const [showDelete, setShowDelete] = useState(false)
    const [treeData, setTreeData] = useState([])

    useEffect(() => {
        dispatch(fetchAllUsersData())
    }, [])

    const breathFirst = (nodes) => {
        // const data = childerens ? childerens : usersData
        const tree = nodes.map(i => {
            if (visited.includes(i._id)) return

            visited.push(i._id)

            const myChilderens = usersData.reverse().filter(j => j.referral === i.referralCode)

            console.log(i.name)
            console.log({myChilderens})

            if (!myChilderens[0]) {
                return {
                    id: i._id,
                    name: i.name,
                    title: i.rank,
                    children: []
                }
            }

            return {
                id: i._id,
                name: i.name,
                title: i.rank,
                children: breathFirst(myChilderens)
            }

        })

        return tree
    }

    const constructTree = () => {
        let tree = breathFirst(usersData.reverse())
        tree = tree.filter(i => i !== undefined)
        console.log(tree)
        return tree
    }

    if (loading || !usersData) {
        return (<TableDataLoadingSkleton />)
    }

    return (
        <div>
            {/* <Alert color='info' isOpen={true}>
                <div className='alert-body'>
                <AlertCircle size={15} />{' '}
                <span className='ml-1'>
                    Scroll horizontall and vertically to view the full tree view
                </span>
                </div>
            </Alert> */}

            <div style={{padding: 10}}>
                <OrganizationChart pan={true}  datasource={{
                    id: "businessaacharya",
                    name: "Business Aacharya",
                    title: "",
                    children: constructTree()
                }} />
            </div>
        </div>
    )

}

export default MlmTree