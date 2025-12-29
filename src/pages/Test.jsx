import axios from "axios";
import { useEffect, useState } from "react";

export function Test() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // برای جستجو
    const [filter, setFilter] = useState("all"); // برای فیلتر (all, completed, pending)

    const fetchTodos = () => {
        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(res => setTodos(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        axios.post('http://127.0.0.1:8000/api/todos/', { title: newTodo, completed: false })
            .then(() => {
                setNewTodo("");
                fetchTodos();
            });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
            .then(() => fetchTodos());
    };

    const toggleTodo = (id) => {
        axios.patch(`http://127.0.0.1:8000/api/todos/${id}/toggle/`)
            .then(() => fetchTodos());
    };

    // منطق فیلتر و جستجو
    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === "all" ? true :
            filter === "completed" ? todo.completed :
            !todo.completed;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 font-['vazir',tahoma]" dir="rtl">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10">
                <h1 className="text-4xl font-black text-center text-slate-800 mb-10 tracking-tight">
                    لیست <span className="text-indigo-600">کارها</span>
                </h1>

                {/* بخش ورودی تسک جدید */}
                <div className="flex gap-3 mb-8">
                    <input
                        className="flex-1 bg-slate-50 border-2 border-transparent rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="یک کار جدید اضافه کنید..."
                    />
                    <button
                        onClick={addTodo}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
                    >
                        ثبت
                    </button>
                </div>

                {/* نوار ابزار: جستجو و فیلتر */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-slate-50 p-4 rounded-xl">
                    <div className="relative w-full md:w-64">
                        <input
                            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="جستجوی تسک..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute right-3 top-2 text-slate-400">🔍</span>
                    </div>

                    <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                        {['all', 'pending', 'completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1 text-xs font-bold rounded-md transition-all ${
                                    filter === f ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'
                                }`}
                            >
                                {f === 'all' ? 'همه' : f === 'pending' ? 'در جریان' : 'انجام شده'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* لیست تسک‌ها */}
                <div className="space-y-4">
                    {filteredTodos.map(item => (
                        <div key={item.id} className="group flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleTodo(item.id)}>
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                    item.completed ? 'bg-green-500 border-green-500 scale-110' : 'border-slate-300 group-hover:border-indigo-400'
                                }`}>
                                    {item.completed && <span className="text-white text-sm">✓</span>}
                                </div>
                                <span className={`text-lg font-medium transition-all duration-300 ${
                                    item.completed ? 'line-through text-slate-400 opacity-60' : 'text-slate-700'
                                }`}>
                                    {item.title}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteTodo(item.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* پیام برای لیست خالی */}
                {filteredTodos.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 text-lg">نتیجه‌ای پیدا نشد...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
