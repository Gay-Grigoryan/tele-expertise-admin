"use client";
import React, { useEffect, useState } from "react";
import { useAdmins } from "@/features/admins/hooks";
import Header from "@/features/authenticated-layout/components/header";
import { Filters } from "@/features/authenticated-layout/components/header/enums";
import TablePagination from "@/features/table/pagination";
import AdminsGridView from "@/features/admins/components/grid-view";
import AdminsTableView from "@/features/admins/components/table-view";
import DeleteModal from "@/common/components/delete-modal";
import EditModal from "@/features/admins/components/edit-modal";
import AddModal from "@/features/admins/components/add-modal";
import useAuthStore from "@/features/auth/auth-store";
import CustomSelect, { Option } from "@/common/components/select";
import Api from "@/api";

export default function Admins() {
  const { type } = useAuthStore(state => ({ type: state.info }));
  const [countryId, setCountryId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [hospitalId, setHospitalId] = useState<number | null>(null);
  const [professionId, setProfessionId] = useState<number | null>(null);

  const { data: countries } = Api.useApi(() => Api.common.GetCountries(), []);
  const countryOptions = countries?.map(({ id, name }) => ({ value: id, label: name }));
  const { data: cities } = Api.useApi(() => (countryId ? Api.common.GetCities(countryId) : Api.error()), [countryId]);
  const cityOptions = cities?.map(({ id, name }) => ({ value: id, label: name }));
  const { data: hospitals } = Api.useApi(() => (cityId ? Api.common.GetHospitals(cityId) : Api.error()), [cityId]);
  const hospitalOptions = hospitals?.map(({ id, name }) => ({ value: id, label: name }));
  const { data: professions } = Api.useApi(
    () => (hospitalId ? Api.common.GetProfessions(hospitalId) : Api.error()),
    [hospitalId]
  );
  const professionOptions = professions?.map(({ id, name }) => ({ value: id, label: name }));

  const isSuperAdmin = type === "super_admin";

  const [mode, setMode] = useState(Filters.grid);
  const {
    onSearch,
    searchedValue,
    onPageChange,
    page,
    rowsPerPage,
    onAdd,
    admins,
    onEdit,
    onRemove,
    closeDeleteModal,
    openDeleteModal,
    showDeleteModal,
    closeEditModal,
    openEditModal,
    showEditModal,
    editModalInfo,
    closeAddModal,
    openAddModal,
    showAddModal
  } = useAdmins(countryId, cityId, hospitalId, professionId);
  const views: Record<Filters, React.ReactNode> = {
    grid: <AdminsGridView admins={admins} onEdit={openEditModal} onRemove={openDeleteModal} />,
    table: <AdminsTableView admins={admins} onEdit={openEditModal} onRemove={openDeleteModal} />
  };

  useEffect(() => {
    if (!countryId) {
      setCityId(null);
      setHospitalId(null);
      setProfessionId(null);
    }
  }, [countryId]);

  useEffect(() => {
    if (!cityId) {
      setHospitalId(null);
      setProfessionId(null);
    }
  }, [cityId]);

  useEffect(() => {
    if (!hospitalId) {
      setProfessionId(null);
    }
  }, [hospitalId]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div>
        <Header
          searchPlaceholder="Name"
          activeFilter={mode}
          onActiveFilterChange={setMode}
          onSearch={onSearch}
          searchedValue={searchedValue}
        >
          <div className="grid grid-cols-4 gap-3 px-4">
            <CustomSelect
              options={countryOptions || []}
              selectedOption={countryId}
              onChange={setCountryId}
              placeholder="Country"
            />
            {countryId && (
              <CustomSelect options={cityOptions || []} selectedOption={cityId} onChange={setCityId} placeholder="City" />
            )}
            {cityId && (
              <CustomSelect
                options={hospitalOptions || []}
                selectedOption={hospitalId}
                onChange={setHospitalId}
                placeholder="Hospital"
              />
            )}
            {hospitalId && (
              <CustomSelect
                options={professionOptions || []}
                selectedOption={professionId}
                onChange={setProfessionId}
                placeholder="Profesion"
              />
            )}
          </div>
        </Header>
      </div>
      {views[mode]}
      <div>
        <TablePagination
          page={page}
          perPage={rowsPerPage}
          pageCount={1}
          setPage={onPageChange}
          total={1}
          onAdd={isSuperAdmin ? openAddModal : undefined}
        />
      </div>
      {isSuperAdmin ? (
        <>
          {showDeleteModal && <DeleteModal onClose={closeDeleteModal} onDelete={onRemove} text="doctor" />}
          {showEditModal && <EditModal onEdit={onEdit} info={editModalInfo!} onClose={closeEditModal} />}
          {showAddModal && <AddModal onAdd={onAdd} onClose={closeAddModal} />}
        </>
      ) : null}
    </div>
  );
}
