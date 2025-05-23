import React, { useState, useEffect } from 'react'
import { api, apiAuth } from '~/services/api'

const Orders = () => {
  const [users, setUsers] = useState([
    {
      _id: "6813427eb4e41298819c090c",
      avatar: {
        url: '',
        public_id: ''
      },
      username: "Dat2",
      name: "Nguyen Hoang Dat",
      password: "",
      email: "htdat2000@gmail.com",
      birthday: "2000-01-01T00:00:00.000+00:00",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    }
  ])
  useEffect(() => {
    apiAuth.get('/admin/manageUser?page=1&limit=10').then((res) => {
      console.log("check user: ", res.data)
      if (res.data.success === true) {
        setUsers(res.data.users)
      }
      // setUsers(res.data.data)
    })
  }, [])
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Orders</h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-dark">
          <thead className="text-xs text-gray-700 dark:text-white dark:bg-gray-700 uppercase bg-gray-50">
            <tr className='dark:bg-gray-500'>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Address list
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <>
                  <tr className=" dark:bg-gray-800 dark:text-white border-b border-gray-200" index={user._id}>
                    <th scope="row" className="dark:text-white px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.username}
                    </th>
                    <td className="px-6 py-4">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      {user.addressList.map((adr) => {
                        return <p>
                          {adr}
                        </p>
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p href="#" className="font-medium text-blue-600 hover:underline cursor-pointer">View</p>
                    </td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders