import React, { useState } from "react";
import axios from "axios";
import { DatePicker, TimePicker, Select, message } from "antd";

export default function CreateAppointments() {
  const [appointmentDate, setAppointmentDate] = useState({
    Name: "",
    Phone: "",
    time: null,
    date: null,
    test: "tests", 
  });

  const userToken = localStorage.getItem("token");

  if (!userToken) {
    message.error("User not authenticated");
    return null;
  }

  const url = `http://localhost:9000/book/${userToken}`;

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleSaveAppointments = async () => {
    const { Name, Phone, time, date, test } = appointmentDate;
    if (!Name || !Phone || !time || !date || !test) {
      message.error("All fields are required");
      return;
    }

    if (!validatePhone(Phone)) {
      message.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (date && isPastDate(date.toDate())) {
      message.error("You cannot book an appointment for a past date.");
      return;
    }

    try {
      await axios.post(url, {
        Name,
        Phone,
        time: time.format("HH:mm"),
        date: date.format("YYYY-MM-DD"),
        test, // Include the selected test in the request
      });
      message.success("Appointment booked successfully");
      setAppointmentDate({
        Name: "",
        Phone: "",
        time: null,
        date: null,
        test: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Time slot not available");
      } else {
        message.error("Error saving appointment");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="border-[1px] border-gray-300 p-8 shadow-2xl space-y-4 mt-20">
        <h3 className="text-center">Booking Page</h3>
        <div>
          <div className="my-2 space-y-3 flex flex-col justify-center items-center">
            <input
              placeholder="Name"
              className="border-[1px] w-48 border-gray-300 px-1.5 py-1.5 rounded-lg text-xs outline-none"
              value={appointmentDate.Name}
              onChange={(e) =>
                setAppointmentDate({ ...appointmentDate, Name: e.target.value })
              }
            />
            <input
              placeholder="Phone"
              className="border-[1px] w-48 border-gray-300 px-1.5 py-1.5 rounded-lg text-xs outline-none"
              value={appointmentDate.Phone}
              onChange={(e) =>
                setAppointmentDate({
                  ...appointmentDate,
                  Phone: e.target.value,
                })
              }
            />
            <DatePicker
              className="m-2 w-48"
              format="DD-MM-YYYY"
              onChange={(date) =>
                setAppointmentDate({ ...appointmentDate, date })
              }
              disabledDate={(current) =>
                current && current < new Date().setHours(0, 0, 0, 0)
              }
            />
            <TimePicker
              className="m-2 w-48"
              format="HH:mm"
              onChange={(time) =>
                setAppointmentDate({ ...appointmentDate, time })
              }
            />
            <Select
              placeholder="Select a pathology test"
              className="w-48"
              value={appointmentDate.test}
              onChange={(value) =>
                setAppointmentDate({ ...appointmentDate, test: value })
              }
            >
              <Select.Option value="Blood Test" className="text-gray-300">
                Blood Test
              </Select.Option>
              <Select.Option value="Urine Test">Urinalysis</Select.Option>
              <Select.Option value="Liver Function Test">
                Liver Function Test
              </Select.Option>
              <Select.Option value="Thyroid Function Test">
                Thyroid Function Test
              </Select.Option>
              <Select.Option value="Complete Blood Count">
                Complete Blood Count
              </Select.Option>
              <Select.Option value="covid 19">COVID-19 Test</Select.Option>
              <Select.Option value="AntiBody">Antibody Test</Select.Option>
            </Select>
          </div>
          <div className="flex justify-center my-4">
            <button
              className="bg-blue-600 text-white rounded-lg px-20 py-2 text-sm"
              onClick={handleSaveAppointments}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
