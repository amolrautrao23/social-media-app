import Swal from "sweetalert2";

export const confirmDialog = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmButtonText = "Yes, do it!",
  confirmButtonColor = "#d33",
  cancelButtonColor = "#3085d6",
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  });

  return result.isConfirmed;
};
