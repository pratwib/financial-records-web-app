import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteRecord, getRecords} from "../api/record.js";
import {IconPencil, IconTrash} from "@tabler/icons-react";

const RecordList = ({setRecordId}) => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.record.records);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        dispatch(getRecords());
    }, [dispatch, records]);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('id-ID').format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const filteredRecords = Array.isArray(records) ? records.filter(record => {
        if (filter === "all") return true;
        return record.type === filter;
    }) : [];

    return (
        <div className="pe-2" style={{height: '100vh'}}>
            <div className="sticky-top bg-white py-3">
                <label className="form-label">Filter by Type:</label>
                <select className="form-select w-25" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div className="overflow-auto no-scrollbar justify-content-center align-items-centers"
                 style={{height: '86.8vh'}}>
                {filteredRecords.length > 0 ? (
                    filteredRecords.slice().reverse().map(record => (
                        <div key={record._id} className="card mb-2">
                            <div className="card-body">
                                <div className="d-flex mb-3 gap-2">
                                    <div
                                        className={`${
                                            record.type === "income"
                                                ? "bg-success text-white"
                                                : "bg-danger text-white"
                                        }`}
                                        style={{
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                        }}>
                                        {record.type === "income" ? "Income" : "Expense"}
                                    </div>
                                    <div
                                        className={`${
                                            record.type === "income"
                                                ? "text-success border border-success"
                                                : "text-danger border border-danger"
                                        }`}
                                        style={{
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                        }}>
                                        {record.category}
                                    </div>
                                </div>
                                <h5 className="card-title mb-3">{record.description}</h5>
                                <p className="card-text">{formatDate(record.date)}</p>
                                <p className="card-text">Rp {formatAmount(record.amount)}</p>
                                <button
                                    className="btn btn-primary me-2" onClick={() => setRecordId(record._id)}>
                                    <IconPencil/>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => dispatch(deleteRecord(record._id))}>
                                    <IconTrash/>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No records found.</p>
                )}
            </div>
        </div>
    );
};

export default RecordList;
