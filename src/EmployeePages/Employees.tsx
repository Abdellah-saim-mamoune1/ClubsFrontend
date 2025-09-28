import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { GetAllEmployees, AddNewEmployee, DeleteEmployee } from "../APIs/EmployeeAPIs";

export interface IGetEmployee {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  gender: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IPerson {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IAddEmployee {
  person_informations: IPerson;
  password: string;
  role: string;
}

export function Employees() {
  const [employees, setEmployees] = useState<IGetEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<IAddEmployee>({
    person_informations: {
      firstName: "",
      lastName: "",

      gender: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const data = await GetAllEmployees();
    if (data) setEmployees(data);
    setLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.person_informations) {
      setFormData((prev) => ({
        ...prev,
        person_informations: {
          ...prev.person_informations,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await AddNewEmployee(formData);
    if (result) {
      fetchEmployees();
      resetForm();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    const success = await DeleteEmployee(id);
    if (success) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      person_informations: {
        firstName: "",
        lastName: "",
   
        gender: "",
        birthDate: "",
        email: "",
        phoneNumber: "",
        address: "",
      },
      password: "",
      role: "",
    });
  };

  return (
    <div className="p-4  mx-auto">
     <h1 className="text-2xl font-semibold mb-4 text-gray-800">Employees</h1>
      
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 bg-white p-4 shadow rounded sm:grid-cols-2 gap-4 mb-6"
      >
        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>

        {[
          { name: "firstName", placeholder: "First Name" },
          { name: "lastName", placeholder: "Last Name" },
       
          { name: "email", placeholder: "Email", type: "email" },
          { name: "phoneNumber", placeholder: "Phone Number" },
          { name: "address", placeholder: "Address" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={(formData.person_informations as any)[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="input border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <select
          name="gender"
          value={formData.person_informations.gender}
          onChange={handleChange}
          className="input border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          name="birthDate"
          value={formData.person_informations.birthDate}
          onChange={handleChange}
          className="input border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Role</option>
          <option value="Admin">Admin</option>
          <option value="Seller">Seller</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {submitting ? "Submitting..." : "Add Employee"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      {loading ? (
        <div>Loading employees...</div>
      ) : employees.length === 0 ? (
        <div className="text-red-600">No employees found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">First</th>
                <th className="p-2 border">Last</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Birth</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="p-2 border">{emp.id}</td>
                  <td className="p-2 border">{emp.firstName}</td>
                  <td className="p-2 border">{emp.lastName}</td>
                  <td className="p-2 border">{emp.type}</td>
                  <td className="p-2 border">{emp.gender}</td>
                  <td className="p-2 border">{emp.birthDate}</td>
                  <td className="p-2 border">{emp.email}</td>
                  <td className="p-2 border">{emp.phoneNumber}</td>
                  <td className="p-2 border">{emp.address}</td>
                  <td className="p-2 border">
                  {emp.type!="Admin"&&  <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
