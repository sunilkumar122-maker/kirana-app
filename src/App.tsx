import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TrashPage from "./pages/TrashPage";
import CustomersPage from "./pages/CustomersPage";
import Settings from "./pages/Settings";
import Layout from "@/components/Layout";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import { useState } from "react";
import ExpiredUsers from "./pages/ExpiredUsers";


function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("dashboard");

  if (loading) return <div>Loading...</div>;
  if (!user) return <LoginPage />;

  let content;

  if (page === "dashboard") {
    content = <Dashboard />;
  } else if (page === "customers") {
    content = <CustomersPage setPage={setPage} />;
  } else if (page === "settings") {
    content = <Settings setPage={setPage} />;
  } else if (page === "trash") {
    content = <TrashPage />;
  }else if (page === "expired") {
    content = <ExpiredUsers />;
  } else if (page.startsWith("customer-")) {
    const id = page.split("-")[1];
    content = <CustomerDetailPage customerId={id} />;
  }

  return (
    <Layout setPage={setPage} page={page}>
      {content}
    </Layout>
  );
}

export default function App() {
  return <AppContent />;
}
