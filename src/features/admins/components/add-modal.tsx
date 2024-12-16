import React, { useEffect, useState } from "react";
import Modal from "@/common/components/modal";
import ModalContent from "@/common/components/modal-content";
import { Admin } from "@/api/slices/doctors";
import Input from "@/common/components/input";
import Icon from "@/common/components/icon";
import PhoneInput from "react-phone-input-2";
import { generatePassword, isValidEmail } from "@/common/lib";
import Api from "@/api";
import CustomSelect from "@/common/components/select";

interface Props {
  onClose: () => void;
  onAdd: (info: Omit<Admin, "id" | "countryId" | "cityId"> & { password: string }) => void;
}

export default function AddModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const canAdd = name && phone && password && email && hospitalId && professionId;

  const handleGeneratePassword = () => {
    const password = generatePassword(8);
    setPassword(password);
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
    <Modal isOpen>
      <ModalContent
        title="Doctor's information"
        approveButtonTitle="Add"
        cancelButtonTitle="Remove"
        disableApproveButton={!canAdd}
        onApprove={() =>
          onAdd({
            name,
            password,
            phone: phone.startsWith("+") ? phone : `+${phone}`,
            hospital_id: hospitalId!,
            profession_id: professionId!,
            email
          })
        }
        onClose={onClose}
      >
        <div className="flex w-[400px] flex-col gap-2">
          <Input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            endIcons={<p className="text-primary">*</p>}
          />
          <div className="relative rounded-lg border border-gray-dark">
            <PhoneInput
              autoFormat
              country="am"
              containerClass="!w-full"
              inputClass="!border-none !rounded-lg !w-full !h-10"
              buttonClass="!border-none !rounded-lg !hover:rounded-lg"
              placeholder="Phone"
              value={phone}
              onChange={v => setPhone(v)}
            />
            <div className="absolute right-3 top-1/2 h-max -translate-y-1/2">
              <p className="text-primary">*</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
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
                placeholder="Profession"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              endIcons={<p className="text-primary">*</p>}
            />
            {email && !isValidEmail(email) && (
              <p className="pl-1 font-regular text-p4 font-light text-red">Invalid Email address</p>
            )}
          </div>
          <Input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            endIcons={<p className="text-primary">*</p>}
          />
          <div className="flex w-max cursor-pointer items-center gap-2" onClick={handleGeneratePassword}>
            <Icon name="generate" size={16} />
            <p className="font-regular text-l5 text-black/70">Generate</p>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
