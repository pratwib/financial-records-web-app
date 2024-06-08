import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useEffect} from "react";
import {createRecord, updateRecord} from "../api/record.js";

const RecordForm = ({recordId, setRecordId}) => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.record.records);

    const record = recordId ? records.find(record => record._id === recordId) : null;

    const validationSchema = Yup.object({
        date: Yup.date().required('Date Required'),
        type: Yup.string().oneOf(['income', 'expense'], 'Invalid Type'),
        category: Yup.string().required('Category Required'),
        description: Yup.string().required('Description Required'),
        amount: Yup.number().required('Amount Required').positive('Must be positive'),
    });

    const formik = useFormik({
        initialValues: {
            date: '',
            description: '',
            amount: '',
            type: 'income',
            category: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (recordId) {
                dispatch(updateRecord({recordId, values}));
            } else {
                dispatch(createRecord(values));
            }
            clear();
        }
    });

    useEffect(() => {
        if (record) {
            const formattedRecord = {
                ...record,
                date: new Date(record.date).toISOString().split('T')[0],
            };
            formik.setValues(formattedRecord);
        }
    }, [recordId]);

    const clear = () => {
        setRecordId(null);
        formik.resetForm();
    };

    const categories = formik.values.type === 'income' ?
        ['Bonus', 'Freelance', 'Gifts', 'Investment', 'Salary'] :
        ['Clothes', 'Education', 'Housing', 'Food', 'Health', 'Monthly Expenses', 'Transportation', 'Vacation'];

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{recordId ? 'Edit Record' : 'Add Record'}</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.date && formik.errors.date ?
                            <div className="text-danger">{formik.errors.date}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select
                            name="type"
                            className="form-select"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        {formik.touched.type && formik.errors.type ?
                            <div className="text-danger">{formik.errors.type}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            name="category"
                            className="form-select"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option value="">Select</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {formik.touched.category && formik.errors.category ?
                            <div className="text-danger">{formik.errors.category}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter Description"
                            className="form-control"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.description && formik.errors.description ?
                            <div className="text-danger">{formik.errors.description}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter Amount"
                            className="form-control"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.amount && formik.errors.amount ?
                            <div className="text-danger">{formik.errors.amount}</div> : null}
                    </div>

                    <button type="submit" className="btn btn-primary me-2 ">{recordId ? 'Update' : 'Add'}</button>
                    <button type="button" className="btn btn-outline-primary" onClick={clear}>Clear</button>
                </form>
            </div>
        </div>
    );
}

export default RecordForm;
