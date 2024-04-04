import React, { useEffect, useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import { GET_ADDED_DEPARTMENTS, GET_DEPARTMENT_USER, GET_DEPARTMENT_USER_COUNT } from "../context/mutation";
import { useQuery } from "@apollo/client";
import SearchIcon from "../assets/searchIcon.svg";
import UserCell from "../components/UserCell";
import { Link } from "react-router-dom";
import { client } from "../main";
import LoaderOverlay from "../components/loadinOverlay";



const Users = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentsUsers, setDepartmentsUsers] = useState([]);
  const { data: addedDepartments,refetch:refetchData } = useQuery(GET_ADDED_DEPARTMENTS);
  // const { data: departmentUsers } = useQuery(GET_DEPARTMENT_USER);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('isUserDeleted')){
      setLoading(true)
      console.log('refetching request received')
      refetchData();
      localStorage.removeItem('isUserDeleted')
      window.location.reload();
    }
  },[])
  useEffect(() => {
    if (addedDepartments) {
      const departmentsWithCounts = addedDepartments.getAddedDepartments?.departments.map(async (department) => {
        setLoading(true);
        try {
          const { data } = await client.query({
            query: GET_DEPARTMENT_USER_COUNT,
            variables: { input: department?.id }
          });
          return { ...department, userCount: data.getDepartmentUserCount.count };
        } catch (error) {
          console.error("Error fetching user counts:", error);
          return { ...department, userCount: 0 };
        } finally {
          setLoading(false);
        }
      })

      const allDepartmentUsersQueries = addedDepartments.getAddedDepartments?.departments.map(async (department) => {
        setLoading(true);
        try {
          const { data } = await client.query({
            query: GET_DEPARTMENT_USER,
            variables: { input: department?.id }
          });
          return data.getDepartmentUsers.users;
        } catch (error) {
          console.error("Error fetching users:", error);
          return [];
        } finally {
          setLoading(false);
        }
      });

      // Execute all user queries
      Promise.all(allDepartmentUsersQueries).then((allDepartmentUsers) => {
        // Flatten the array of arrays to get a single array of all users
        const flattenedUsers = allDepartmentUsers.flat();
        setDepartmentsUsers(flattenedUsers);
      });

      Promise.all(departmentsWithCounts).then((departmentsWithCounts) => {
        setDepartments(departmentsWithCounts);
      });
    }
  }, [addedDepartments]);




  const handleSearch = (e) => {
    console.log(e.target.value);

    setSearchQuery(e.target.value);
  };
  console.log(departmentsUsers,searchQuery)
  const filteredUsers = searchQuery?.trim() ? 
  departmentsUsers?.filter((user) => 
    user.fullName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  ) : departmentsUsers;

  return (
    <>
        <div className="w-full flex flex-col md:p-12 py-8 px-3 md:gap-12 gap-6 bg-white">
          {/* Heading */}
          <h1 className="md:text-2xl text-xl font-HelveticaNeueBold">
            User Management Panel
          </h1>

          {/* departments */}
          <div className="flex flex-col md:gap-8 gap-6">
            {/* header */}
            <div className="flex md:flex-row flex-col md:justify-between gap-2">
              <div className="flex flex-col md:gap-1 gap-2">
                <h1 className="text-[#0F172A] font-HelveticaNeueMedium">
                  Your Departments
                </h1>

                <h2 className="text-[#64748B] md:text-sm text-xs font-HelveticaNeueItalic">
                  Create Departments for your organisations and manage permissions
                </h2>
              </div>

              {/* add department button */}
              <Link
                to="add-department"
                className="md:text-base text-sm text-center align-middle md:w-[15.5rem] rounded md:py-3 py-2 px-4 bg-[#031B89] text-white"
              >
                + Add department
              </Link>
            </div>

            {/* department cards */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
              {departments && departments.map((department) => <DepartmentCard
              department={department}
                title={department.name}
                info={
                  department?.permissions?.length > 2
                    ? `${department?.permissions?.slice(0, 2).join(', ')}, and ${department?.permissions?.length - 2} more`
                    : department?.permissions?.join(', ')
                }
                users={department?.userCount}
              />)}
              {!departments?.length? <p className="text-[#64748B] font-HelveticaNeueItalic text-sm text-center align-middle md:w-[15.5rem]">No departments found</p>:<></>}
            </div>
          </div>

          {/* users */}
          <div className="flex flex-col md:gap-8 gap-6">
            {/* header */}
            <div className="flex md:flex-row flex-col md:justify-between md:h-[2.75rem] gap-2">
              <div className="flex flex-col md:gap-1 gap-2">
                <h1 className="text-[#0F172A] font-HelveticaNeueMedium">
                  All Users
                </h1>

                <h2 className="text-[#64748B] md:text-sm text-xs font-HelveticaNeueItalic">
                  Add and manage people to your org and manage user permissions
                </h2>
              </div>

              <div className="flex md:flex-row flex-col md:gap-4 gap-2 ">
                {/* searchbar */}
                <div className="md:w-[19.625rem] rounded border border-[#CBD5E1] bg-white md:py-0.5 px-2">
                  <div className="md:p-2 p-1 flex gap-2 items-center">
                    <img src={SearchIcon} alt="search icon" className="w-6 h-6" />

                    <input
                    type="text"
                    placeholder="Search for people"
                    className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none"
                    onChange={handleSearch}
                    value={searchQuery}
                  />
                  </div>
                </div>

                {/* add user button */}
                <Link
                  to="add-user"
                  className="md:text-base text-sm align-middle text-center md:w-[15.5rem] rounded md:py-3 py-2 px-4 bg-[#031B89] text-white"
                >
                  + Add new User
                </Link>
              </div>
            </div>

            {/* user table */}
            <div className="rounded-lg border border-[#E2E8F0] bg-white flex flex-col">
              {/* labels */}
              <div className="md:flex hidden justify-between border-y border-[#CBD5E1] bg-[#FAFAFA] py-6 px-12">
                <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
                  Name
                </h1>
                <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
                  Employee ID
                </h1>
                <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
                  Department
                </h1>
                <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
                  Role
                </h1>
              </div>

              {filteredUsers?.length ? filteredUsers.map((tableData) => { return (<UserCell key={tableData.id} tableData={tableData} />) }) : <div className="p-4 text-sm font-HelveticaNeueItalic text-[#64748B] text-center w-full">No users found</div>}
            </div>
          </div>
        </div>
      {loading ? <LoaderOverlay /> : <></>}
    </>
  );
};

export default Users;
