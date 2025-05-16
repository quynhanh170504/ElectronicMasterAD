import React, { useState } from 'react'

const User = () => {
  const [users, setUsers] = useState([
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
      phone: "0826759121",
      password: "$2b$10$oSnLgaNflrmP90dTbs/XWeYH38CbqYydwmAZK5UCqyJuH.O4nuFa2",
      gender: "Khác",
      role: "customer",
      addressList: ['LA', '123st Ford New York', 'Tan An, Long An, Viet Nam'],
      createdAt: "2025-05-01T09:44:30.569+00:00",
      updatedAt: "2025-05-01T09:44:30.569+00:00",
      __v: 0
    },
    {
      _id: "6813427eb4e41298819c090c",
      username: "Dat2",
      email: "htdat2000@gmail.com",
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
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
        <div className='py-3'>
          <h2 className='py-3 px-3 font-[600] text-[20px]'>Recent Users</h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
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
                  <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200" index={user._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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

export default User