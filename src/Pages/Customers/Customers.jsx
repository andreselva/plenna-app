import { useCustomerHandler } from "../../Handlers/useCustomerHandler";
import { ModalCustomers } from "../../Modals/ModalCustomers/ModalCustomers";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { CustomersTable } from "../../Tables/Customers/CustomersTable";

const Customers = () => {
  const {
    customers,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingCustomer,
    setEditingCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleSaveCustomer,
    resetForm,
    loading,
    error,
  } = useCustomerHandler();

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles["container-content"]}>
        <div className={globalStyles["content-title"]}>
          <div className={globalStyles["content-title-items"]}>
            <div className={globalStyles["content-title-items-left"]}>
              <button
                className={globalStyles["title-items-button"]}
                onClick={handleOpenModal}
              />
              <span className={globalStyles["title-items-span"]}>Clientes</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <CustomersTable
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalCustomers
          setIsModalOpen={setIsModalOpen}
          handleSaveCustomer={handleSaveCustomer}
          setEditingCustomer={setEditingCustomer}
          editingCustomer={editingCustomer}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default Customers;