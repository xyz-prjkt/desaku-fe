import { ContentPaper } from "@/components/atoms/paper";
import SKBedaNamaDescriptions from "@/components/general/views/SKBedaNamaDescriptions";
import SKDispensasiDescriptions from "@/components/general/views/SKDispensasiDescriptions";
import SKDomisiliDescriptions from "@/components/general/views/SKDomisiliDescriptions";
import SKKehilanganDescriptions from "@/components/general/views/SKKehilanganDescriptions";
import SKKelahiranDescriptions from "@/components/general/views/SKKelahiranDescriptions";
import SKKematianDescriptions from "@/components/general/views/SKKematianDescriptions";
import SKKtpSementaraDescriptions from "@/components/general/views/SKKtpSementaraDescriptions";
import SKTidakMampuDescriptions from "@/components/general/views/SKTidakMampuDescriptions";
import SKUsahaDescriptions from "@/components/general/views/SKUsahaDescriptions";
import { useGetVerifySk } from "@/services/verify.service";
import { Result } from "antd";
import { useNavigate, useParams } from "react-router";

const VerifyPages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: sk,
    isLoading: skIsLoading,
    isError: skIsError,
  } = useGetVerifySk(id);

  const renderSKDescriptions = () => {
    if (!sk?.data) return null;

    switch (sk.data.sk_type) {
      case "BEDA_NAMA":
        return <SKBedaNamaDescriptions data={sk.data} />;
      case "DISPENSASI":
        return <SKDispensasiDescriptions data={sk.data} />;
      case "DOMISILI":
        return <SKDomisiliDescriptions data={sk.data} />;
      case "KEHILANGAN":
        return <SKKehilanganDescriptions data={sk.data} />;
      case "KELAHIRAN":
        return <SKKelahiranDescriptions data={sk.data} />;
      case "KEMATIAN":
        return <SKKematianDescriptions data={sk.data} />;
      case "KTP_SEMENTARA":
        return <SKKtpSementaraDescriptions data={sk.data} />;
      case "TIDAK_MAMPU":
        return <SKTidakMampuDescriptions data={sk.data} />;
      case "USAHA":
        return <SKUsahaDescriptions data={sk.data} />;
      default:
        return (
          <Result
            status="404"
            title="SK Type Not Found"
            subTitle="Jenis SK tidak ditemukan atau belum didukung."
          />
        );
    }
  };

  if (skIsError) {
    return (
      <ContentPaper>
        <Result
          status="error"
          title="Error Loading Data"
          subTitle="Terjadi kesalahan saat memuat data SK."
        />
      </ContentPaper>
    );
  }

  return (
    <ContentPaper isLoading={skIsLoading}>
      {renderSKDescriptions()}
    </ContentPaper>
  );
};

export default VerifyPages;
