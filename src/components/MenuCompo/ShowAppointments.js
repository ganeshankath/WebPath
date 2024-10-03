import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export default function ShowAppointments({ role, ui }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(ui);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/book/appointments"
        );
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments.");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleAction = async (appointmentId, action) => {
    if (action === "Reject") {
      try {
        const url = `http://localhost:9000/book/appointments/${appointmentId}`;
        console.log(`Deleting appointment at URL: ${url}`);
        await axios.delete(url);
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
        message.success("Appointment deleted successfully");
      } catch (error) {
        console.error(
          "Error deleting appointment:",
          error.response ? error.response.data : error.message
        );
        message.error("Failed to delete appointment");
      }
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-10 mb-96">
      <table className="max-w-6xl w-full">
        <thead>
          <tr className="flex justify-between items-center mt-3.5 bg-gray-200 text-left">
            <th className="w-1/6 px-4 py-2">S.NO</th>
            <th className="w-1/6 px-4 py-2">Name</th>
            <th className="w-1/6 px-4 py-2">Phone</th>
            <th className="w-1/6 px-4 py-2">Date</th>
            <th className="w-1/6 px-4 py-2">Time</th>
            {role === "userType" && <th className="w-1/6 px-4 py-2 text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={index}
              className="flex justify-between items-center mt-3.5 border-b-[1px] border-gray-300"
            >
              <td className="w-1/6 px-4 py-2">{index + 1}</td>
              <td className="w-1/6 px-4 py-2">{appointment.Name}</td>
              <td className="w-1/6 px-4 py-2">{appointment.Phone}</td>
              <td className="w-1/6 px-4 py-2">
                {new Date(appointment.date).toLocaleDateString()}
              </td>
              <td className="w-1/6 px-4 py-2">{appointment.time}</td>
              {role === "userType" && (
                <td className="w-1/6 flex items-center justify-center gap-3 px-4 py-2">
                  <button
                    className="bg-red-600 text-white rounded-lg px-3.5 py-2 text-sm"
                    onClick={() => handleAction(appointment._id, "Reject")}
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
