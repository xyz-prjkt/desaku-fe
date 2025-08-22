import {
  CloudSyncOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  GlobalOutlined,
  LockOutlined,
  MailOutlined,
  MenuOutlined,
  PhoneOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Layout,
  Menu,
  Row,
  Space,
  Statistic,
  Steps,
  theme,
  Typography,
} from "antd";
import { LandmarkIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text, Link: AntLink } = Typography;

const sections = [
  { key: "tentang", label: "Tentang" },
  { key: "fitur", label: "Fitur" },
  { key: "alur", label: "Alur" },
  { key: "faq", label: "FAQ" },
  { key: "kontak", label: "Kontak" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => sections.map((s) => ({ key: s.key, label: <span>{s.label}</span> })),
    []
  );

  const handleMenuClick = (key: string) => {
    scrollToId(key);
    setMobileMenuOpen(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>DesaKU — Digital Administration</title>
        <meta
          name="description"
          content="Layanan administrasi desa digital yang cepat, transparan, dan aman."
        />
      </Helmet>
      {/* Header */}
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          backgroundColor: token.colorBgElevated,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          padding: `0 ${token.paddingLG}px`,
        }}
      >
        <Flex justify="space-between" align="center" style={{ height: "100%" }}>
          <Space size={token.sizeMS} align="center">
            <div
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: token.borderRadius,
                backgroundColor: token.colorPrimary,
              }}
            >
              <LandmarkIcon color="white" size={18} />
            </div>
            <Typography.Title
              level={4}
              style={{ margin: 0, color: token.colorText }}
            >
              <span className="hidden sm:inline">
                Desaku Digital Administration
              </span>
              <span className="sm:hidden">DesaKU</span>
            </Typography.Title>
          </Space>

          {/* Desktop Menu */}
          <Menu
            mode="horizontal"
            selectable={false}
            items={menuItems}
            onClick={(e) => scrollToId(e.key as string)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              minWidth: 0,
            }}
            className="hidden md:flex"
          />

          {/* Desktop CTA */}
          <Space size={token.sizeSM} className="hidden md:flex">
            <Button onClick={() => navigate("/auth")}>Masuk</Button>
            <Button type="primary" onClick={() => navigate("/auth")}>
              Mulai Sekarang
            </Button>
          </Space>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden"
            style={{ padding: "4px 8px" }}
          />
        </Flex>

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <Space size={8} align="center">
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: token.borderRadiusLG,
                  backgroundColor: token.colorPrimary,
                }}
              >
                <LandmarkIcon color="white" size={14} />
              </div>
              <span>DesaKU</span>
            </Space>
          }
          placement="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          width={280}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            mode="vertical"
            selectable={false}
            items={menuItems}
            onClick={(e) => handleMenuClick(e.key as string)}
            style={{ border: "none" }}
          />
          <div style={{ padding: "16px" }}>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => {
                navigate("/auth");
                setMobileMenuOpen(false);
              }}
            >
              Mulai Sekarang
            </Button>
          </div>
        </Drawer>
      </Header>

      <Content>
        {/* Hero Section */}
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Hero Content Overlay */}
          <div className="w-full relative z-10">
            <div className="max-w-7xl mx-auto text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
              <p className="font-bold text-xl md:text-4xl text-black">
                Desaku Digital{" "}
                <span className="text-neutral-400">
                  {"Administration".split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </p>
              <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                Transformasi layanan administrasi desa yang cepat, transparan,
                dan terintegrasi. Ajukan surat, pantau progres, dan selesaikan
                urusan Anda tanpa antri.
              </p>
              <Space size="middle" className="mt-8">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/auth")}
                  icon={<RocketOutlined />}
                >
                  Mulai Sekarang
                </Button>
                <Button size="large" onClick={() => scrollToId("fitur")}>
                  Pelajari Lebih Lanjut
                </Button>
              </Space>
            </div>
          </div>
        </section>

        {/* Tentang Section */}
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section
              id="tentang"
              style={{
                padding: `${token.paddingXL}px 0`,
              }}
            >
              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  <Space
                    direction="vertical"
                    size={token.sizeMS}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <Typography.Title level={2}>
                      Kenapa Desaku?
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{
                        fontSize: token.fontSizeLG,
                        color: token.colorTextSecondary,
                      }}
                    >
                      Platform modern untuk administrasi desa. Memudahkan warga
                      dan perangkat desa berinteraksi dalam satu sistem yang
                      aman dan efisien.
                    </Typography.Paragraph>
                  </Space>
                </Col>
              </Row>

              <Row
                gutter={[
                  { xs: 16, sm: 24, lg: 32 },
                  { xs: 16, sm: 24, lg: 32 },
                ]}
                style={{ marginTop: token.marginXL }}
              >
                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <ThunderboltOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Cepat & Efisien
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Proses digital dari pengajuan hingga penerbitan
                          dokumen tanpa perlu datang ke kantor.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <SafetyCertificateOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Transparan
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Lacak status pengajuan secara real‑time dan terima
                          notifikasi setiap perubahan.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <LockOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Aman
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Keamanan data terjamin dengan kontrol akses dan jejak
                          audit yang jelas.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <CloudSyncOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Terintegrasi
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Integrasi layanan dan data antar perangkat untuk
                          meminimalkan input berulang.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <TeamOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Kolaboratif
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Alur persetujuan lintas perangkat desa yang jelas dan
                          terdokumentasi.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    styles={{ body: { height: "100%" } }}
                  >
                    <Space
                      size={token.sizeMS}
                      align="start"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          fontSize: token.fontSizeHeading3,
                          color: token.colorPrimary,
                          flexShrink: 0,
                        }}
                      >
                        <PhoneOutlined />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: 0, marginBottom: token.marginSM }}
                        >
                          Mobile‑friendly
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            marginBottom: 0,
                            color: token.colorTextSecondary,
                          }}
                        >
                          Bisa diakses di mana saja, kapan saja dari perangkat
                          Anda.
                        </Typography.Paragraph>
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </section>
          </div>
        </div>

        {/* Statistik */}
        <div className="w-full flex justify-center">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section style={{ padding: `${token.paddingLG}px 0` }}>
              <Row
                justify="center"
                gutter={[
                  { xs: 16, sm: 24 },
                  { xs: 16, sm: 24 },
                ]}
              >
                <Col xs={12} md={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Pengajuan/Bulan"
                      value={1200}
                      suffix="+"
                    />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card bordered={false}>
                    <Statistic title="Dokumen Terbit" value={980} suffix="+" />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card bordered={false}>
                    <Statistic
                      title="Waktu Proses"
                      value={2}
                      suffix="hari rata‑rata"
                    />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card bordered={false}>
                    <Statistic title="Kepuasan" value={97} suffix="%" />
                  </Card>
                </Col>
              </Row>
            </section>
          </div>
        </div>

        {/* Alur Section */}
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section id="alur" style={{ padding: `${token.paddingXL}px 0` }}>
              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  <Space
                    direction="vertical"
                    size={token.sizeMS}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <Title level={2} style={{ textAlign: "center" }}>
                      Alur Layanan
                    </Title>
                    <Paragraph
                      style={{
                        textAlign: "center",
                        color: token.colorTextSecondary,
                        fontSize: token.fontSizeLG,
                      }}
                    >
                      Lima langkah sederhana untuk menyelesaikan kebutuhan
                      administrasi Anda.
                    </Paragraph>
                    <Steps
                      responsive
                      style={{ marginTop: token.marginLG }}
                      items={[
                        {
                          title: "Masuk",
                          description: "Autentikasi akun Anda",
                        },
                        {
                          title: "Pilih Layanan",
                          description: "Pilih jenis surat/layanan",
                        },
                        {
                          title: "Isi Formulir",
                          description: "Lengkapi data yang diperlukan",
                        },
                        {
                          title: "Verifikasi",
                          description: "Proses persetujuan internal",
                        },
                        {
                          title: "Selesai",
                          description: "Unduh atau ambil dokumen",
                        },
                      ]}
                    />
                  </Space>
                </Col>
              </Row>
            </section>
          </div>
        </div>

        {/* Fitur Section */}
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section id="fitur" style={{ padding: `${token.paddingXL}px 0` }}>
              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  <Space
                    direction="vertical"
                    size={token.sizeMS}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <Title level={2} style={{ textAlign: "center" }}>
                      Fitur Utama
                    </Title>
                    <Paragraph
                      style={{
                        textAlign: "center",
                        color: token.colorTextSecondary,
                        fontSize: token.fontSizeLG,
                      }}
                    >
                      Dirancang untuk perangkat desa dan warga dengan antarmuka
                      yang intuitif.
                    </Paragraph>
                  </Space>
                </Col>
              </Row>
              <Row
                gutter={[
                  { xs: 16, sm: 24, lg: 32 },
                  { xs: 16, sm: 24, lg: 32 },
                ]}
                style={{ marginTop: token.marginXL }}
              >
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <Space>
                        <ThunderboltOutlined />
                        Pelacakan Real‑time
                      </Space>
                    }
                    hoverable
                    style={{ height: "100%" }}
                  >
                    Lihat status pengajuan dan histori komunikasi setiap saat.
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <Space>
                        <CloudSyncOutlined />
                        Integrasi Data
                      </Space>
                    }
                    hoverable
                    style={{ height: "100%" }}
                  >
                    Data pemohon otomatis terisi dari profil sehingga mengurangi
                    kesalahan input.
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <Space>
                        <SafetyCertificateOutlined />
                        Tanda Tangan Digital
                      </Space>
                    }
                    hoverable
                    style={{ height: "100%" }}
                  >
                    Mendukung paraf dan tanda tangan elektronik sesuai
                    ketentuan.
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card
                    title={
                      <Space>
                        <TeamOutlined />
                        Peran & Akses
                      </Space>
                    }
                    hoverable
                    style={{ height: "100%" }}
                  >
                    Pengaturan peran perangkat desa dan jalur persetujuan
                    berlapis.
                  </Card>
                </Col>
              </Row>
            </section>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section id="faq" style={{ padding: `${token.paddingXL}px 0` }}>
              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  <Space
                    direction="vertical"
                    size={token.sizeMS}
                    style={{ width: "100%" }}
                  >
                    <Title level={2} style={{ textAlign: "center" }}>
                      Pertanyaan Umum
                    </Title>
                    <Paragraph
                      style={{
                        textAlign: "center",
                        color: token.colorTextSecondary,
                        fontSize: token.fontSizeLG,
                      }}
                    >
                      Beberapa hal yang sering ditanyakan.
                    </Paragraph>
                    <Collapse
                      accordion
                      style={{ marginTop: token.marginLG }}
                      items={[
                        {
                          key: "1",
                          label: "Bagaimana cara memulai pengajuan?",
                          children: (
                            <Paragraph>
                              Klik tombol "Mulai Sekarang", masuk, lalu pilih
                              jenis layanan yang Anda butuhkan.
                            </Paragraph>
                          ),
                        },
                        {
                          key: "2",
                          label: "Apakah dokumen bisa ditandatangani digital?",
                          children: (
                            <Paragraph>
                              Ya, sistem mendukung tanda tangan elektronik
                              sesuai kebijakan yang berlaku di desa Anda.
                            </Paragraph>
                          ),
                        },
                        {
                          key: "3",
                          label: "Bagaimana memantau status pengajuan?",
                          children: (
                            <Paragraph>
                              Anda dapat memantau melalui halaman "Pengajuan
                              Saya" dengan status yang diperbarui realtime.
                            </Paragraph>
                          ),
                        },
                      ]}
                    />
                  </Space>
                </Col>
              </Row>
            </section>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <section style={{ padding: `${token.paddingLG}px 0` }}>
              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  <Card
                    style={{
                      background: token.colorPrimary,
                      border: "none",
                    }}
                    styles={{
                      body: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: token.sizeMS,
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: token.paddingLG,
                      },
                    }}
                  >
                    <Space direction="vertical" size={token.sizeXS}>
                      <Title level={3} style={{ margin: 0, color: "white" }}>
                        Siap memulai transformasi digital?
                      </Title>
                      <Text style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                        Gabung dan rasakan kemudahannya sekarang.
                      </Text>
                    </Space>
                    <Space>
                      <Button
                        size="large"
                        onClick={() => navigate("/auth")}
                        style={{
                          backgroundColor: "white",
                          borderColor: "white",
                          color: token.colorPrimary,
                        }}
                      >
                        Mulai Sekarang
                      </Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </section>
          </div>
        </div>
      </Content>

      {/* Professional Footer */}
      <Footer
        style={{
          backgroundColor: token.colorBgElevated,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          padding: `${token.paddingXL}px ${token.paddingLG}px ${token.paddingMD}px`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Main Footer Content */}
          <Row gutter={[token.sizeLG, token.sizeLG]}>
            {/* Company Info */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Space
                direction="vertical"
                size={token.sizeMS}
                style={{ width: "100%" }}
              >
                <Space size={token.sizeSM} align="center">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: token.borderRadiusLG,
                      backgroundColor: token.colorPrimary,
                    }}
                  >
                    <LandmarkIcon color="white" size={18} />
                  </div>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Desaku Digital Administration
                  </Typography.Title>
                </Space>
                <Typography.Paragraph
                  style={{
                    color: token.colorTextSecondary,
                    marginBottom: 0,
                    maxWidth: 240,
                  }}
                >
                  Solusi administrasi desa digital yang cepat, transparan, dan
                  aman untuk Indonesia modern.
                </Typography.Paragraph>
                <Space size={token.sizeSM}>
                  <Button type="text" icon={<TwitterOutlined />} />
                  <Button type="text" icon={<GithubOutlined />} />
                  <Button type="text" icon={<GlobalOutlined />} />
                </Space>
              </Space>
            </Col>

            {/* Product Links */}
            <Col xs={12} sm={12} md={8} lg={6}>
              <Space
                direction="vertical"
                size={token.sizeMS}
                style={{ width: "100%" }}
              >
                <Typography.Title
                  level={5}
                  style={{ marginBottom: token.marginXS }}
                >
                  Platform
                </Typography.Title>
                <Space direction="vertical" size={token.sizeXS}>
                  <Typography.Link onClick={() => scrollToId("tentang")}>
                    Tentang Kami
                  </Typography.Link>
                  <Typography.Link onClick={() => scrollToId("fitur")}>
                    Fitur Utama
                  </Typography.Link>
                  <Typography.Link onClick={() => scrollToId("alur")}>
                    Alur Layanan
                  </Typography.Link>
                  <Typography.Link onClick={() => scrollToId("faq")}>
                    FAQ
                  </Typography.Link>
                </Space>
              </Space>
            </Col>

            {/* Legal Links */}
            <Col xs={12} sm={12} md={8} lg={6}>
              <Space
                direction="vertical"
                size={token.sizeMS}
                style={{ width: "100%" }}
              >
                <Typography.Title
                  level={5}
                  style={{ marginBottom: token.marginXS }}
                >
                  Legal
                </Typography.Title>
                <Space direction="vertical" size={token.sizeXS}>
                  <Typography.Link href="#" target="_blank">
                    Kebijakan Privasi
                  </Typography.Link>
                  <Typography.Link href="#" target="_blank">
                    Syarat & Ketentuan
                  </Typography.Link>
                  <Typography.Link href="#" target="_blank">
                    Keamanan Data
                  </Typography.Link>
                  <Typography.Link href="#" target="_blank">
                    Bantuan
                  </Typography.Link>
                </Space>
              </Space>
            </Col>

            {/* Contact Info */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Space
                direction="vertical"
                size={token.sizeMS}
                style={{ width: "100%" }}
              >
                <Typography.Title
                  level={5}
                  style={{ marginBottom: token.marginXS }}
                >
                  Kontak
                </Typography.Title>
                <Space direction="vertical" size={token.sizeXS}>
                  <Space size={token.sizeXS}>
                    <MailOutlined style={{ color: token.colorTextSecondary }} />
                    <Typography.Text
                      style={{ color: token.colorTextSecondary }}
                    >
                      cs-desaku@xyzuan.com
                    </Typography.Text>
                  </Space>
                  <Space size={token.sizeXS}>
                    <PhoneOutlined
                      style={{ color: token.colorTextSecondary }}
                    />
                    <Typography.Text
                      style={{ color: token.colorTextSecondary }}
                    >
                      (021) 123-4567
                    </Typography.Text>
                  </Space>
                  <Space size={token.sizeXS} align="start">
                    <EnvironmentOutlined
                      style={{ color: token.colorTextSecondary }}
                    />
                    <Typography.Text
                      style={{ color: token.colorTextSecondary }}
                    >
                      Malang, Indonesia
                    </Typography.Text>
                  </Space>
                </Space>
              </Space>
            </Col>
          </Row>

          {/* Footer Bottom */}
          <Divider
            style={{ margin: `${token.marginLG}px 0 ${token.marginMD}px` }}
          />

          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap={token.sizeSM}
          >
            <Typography.Text type="secondary">
              © {new Date().getFullYear()} DesaKU Digital Administration. Semua
              hak dilindungi.
            </Typography.Text>
            <Space size={token.sizeLG}>
              <Typography.Text type="secondary">
                Desaku Digital Administration © 2025 All rights reserved.
              </Typography.Text>
            </Space>
          </Flex>
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
