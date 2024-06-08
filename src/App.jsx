import {Provider} from "react-redux";
import {useState} from "react";
import store from "./reducers/store.js";
import RecordList from "./components/RecordList.jsx";
import RecordForm from "./components/RecordForm.jsx";

function App() {
    const [recordId, setRecordId] = useState(null);

    return (
        <Provider store={store}>
            <div className="container-fluid" style={{height: '100vh', width: '100vw'}}>
                <div className="d-flex gap-4">
                    <div className="flex-fill d-flex flex-column py-4 px-2">
                        <h1 className="text-center flex-grow-1 d-flex align-items-center justify-content-center">
                            Financial Records
                        </h1>
                        <div className="flex-grow-0">
                            <RecordForm recordId={recordId} setRecordId={setRecordId}/>
                        </div>
                    </div>
                    <div className="flex-fill">
                        <RecordList setRecordId={setRecordId}/>
                    </div>
                </div>
            </div>
        </Provider>
    );
}

export default App;
