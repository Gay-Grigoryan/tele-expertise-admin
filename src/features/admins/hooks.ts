import Api from "@/api";
import { Admin } from "@/api/slices/doctors";
import { startGlobalLoading, stopGlobalLoading } from "@/common/components/global-loading-provider";
import { useModal } from "@/common/hooks/modal";
import { useSnackbar } from "notistack";
import { useState } from "react";

const rowsPerPage = 8;

export const useAdmins = (
  countryId: number | null,
  cityId: number | null,
  hospitalId: number | null,
  professionId: number | null
) => {
  const [searchedValue, setSearchedValue] = useState("");
  const [page, setPage] = useState(1);
  const { data, reload } = Api.useApi(
    () => Api.admins.GetAdmins(page, rowsPerPage, searchedValue, countryId, cityId, hospitalId, professionId),
    [searchedValue, page, rowsPerPage, countryId, cityId, hospitalId, professionId]
  );
  const [deletableAdminId, setDeletableAdminId] = useState("");
  const [editModalInfo, setEditModalInfo] = useState<Admin | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { closeModal: closeAddModal, openModal: openAddModal, isOpen: showAddModal } = useModal();

  const showDeleteModal = !!deletableAdminId;
  const showEditModal = !!editModalInfo;

  const openDeleteModal = (id: string) => setDeletableAdminId(id);
  const closeDeleteModal = () => setDeletableAdminId("");

  const openEditModal = (info: Admin) => setEditModalInfo(info);
  const closeEditModal = () => setEditModalInfo(null);

  const onAdd = async (info: Omit<Admin, "id" | "countryId" | "cityId"> & { password: string }) => {
    startGlobalLoading();
    const { meta } = await Api.admins.CreateAdmin(info);
    stopGlobalLoading();
    if (meta.error) {
      if (meta.error.code === 4062) {
        let errorMessage;
        if (meta.error?.unique_key === "users_phone_key") errorMessage = "An account with this phone number already exists.";
        if (meta.error?.unique_key === "users_email_key") errorMessage = "An account with this email address already exists.";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
          }
        });
      } else enqueueSnackbar("Technical problem, try again later", { variant: "error" });
      return;
    } else {
      enqueueSnackbar("Doctor added", { variant: "success" });
      reload();
      closeAddModal();
    }
  };
  const onEdit = async (info: Partial<Admin | { password: string }>) => {
    startGlobalLoading();
    const { meta } = await Api.admins.UpdateAdmin(editModalInfo!.id, info);
    stopGlobalLoading();
    if (meta.error) {
      if (meta.error.code === 4062) {
        let errorMessage;
        if (meta.error?.unique_key === "users_phone_key") errorMessage = "An account with this phone number already exists.";
        if (meta.error?.unique_key === "users_email_key") errorMessage = "An account with this email address already exists.";
        enqueueSnackbar(errorMessage, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
          }
        });
      } else enqueueSnackbar("Technical Problem, try again later.", { variant: "error" });
      return;
    } else {
      enqueueSnackbar("Doctor has changed.", { variant: "success" });
      reload();
      closeEditModal();
    }
  };
  const onRemove = async () => {
    startGlobalLoading();
    const { meta } = await Api.admins.DeleteAdmin(deletableAdminId!);
    if (meta.error) {
      enqueueSnackbar("Technical Problem, try again later.", { variant: "error" });
    } else {
      enqueueSnackbar("Doctor has been removed.", { variant: "success" });
      reload();
    }
    closeDeleteModal();
    stopGlobalLoading();
  };

  return {
    searchedValue,
    page,
    rowsPerPage,
    onAdd,
    onEdit,
    onRemove,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    showEditModal,
    editModalInfo,
    openAddModal,
    closeAddModal,
    showAddModal,
    onSearch: setSearchedValue,
    onPageChange: setPage,
    admins: data?.items || []
  };
};
