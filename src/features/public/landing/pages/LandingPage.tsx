import {
  CloudSyncOutlined,
  LockOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Area } from "@antv/g2plot";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Layout,
  Menu,
  Row,
  Space,
  Statistic,
  Steps,
  theme,
  Typography,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
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

// Indonesia map data for AntV visualization
const indonesiaMapData = [
  { region: "Sumatera", value: 85, coordinates: [-2.5, 118.0] },
  { region: "Jawa", value: 92, coordinates: [-7.8, 110.4] },
  { region: "Kalimantan", value: 78, coordinates: [-0.8, 114.0] },
  { region: "Sulawesi", value: 88, coordinates: [-2.5, 120.0] },
  { region: "Papua", value: 75, coordinates: [-4.0, 138.0] },
  { region: "Bali & Nusa Tenggara", value: 90, coordinates: [-8.3, 115.8] },
  { region: "Maluku", value: 82, coordinates: [-3.2, 129.0] },
];

const IndonesiaMapVisualization = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const area = new Area(containerRef.current, {
      data: indonesiaMapData,
      xField: "region",
      yField: "value",
      smooth: true,
      color: "#8674b9",
      areaStyle: {
        fillOpacity: 0.3,
      },
      line: {
        color: "#8674b9",
        size: 2,
      },
      point: {
        color: "#8674b9",
        size: 4,
      },
      xAxis: {
        label: {
          style: {
            fontSize: 10,
            fill: "rgba(0,0,0,0.45)",
          },
        },
        grid: {
          line: {
            style: {
              stroke: "rgba(0,0,0,0.06)",
            },
          },
        },
      },
      yAxis: {
        label: {
          style: {
            fontSize: 10,
            fill: "rgba(0,0,0,0.45)",
          },
        },
        grid: {
          line: {
            style: {
              stroke: "rgba(0,0,0,0.06)",
            },
          },
        },
      },
      tooltip: {
        formatter: (data) => {
          return {
            name: "Adopsi Digital",
            value: `${data.value}%`,
          };
        },
      },
    });

    area.render();

    return () => {
      area.destroy();
    };
  }, [containerRef]);

  return null;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const menuItems = useMemo(
    () => sections.map((s) => ({ key: s.key, label: <span>{s.label}</span> })),
    []
  );

  const handleMenuClick = (key: string) => {
    scrollToId(key);
    setDrawerOpen(false);
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
          zIndex: 100,
          width: "100%",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "saturate(180%) blur(8px)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <Row align="middle" gutter={16} wrap={false}>
          <Col flex="none">
            <Space size={8} align="center">
              <RocketOutlined
                style={{ fontSize: 24, color: token.colorPrimary }}
              />
              <Title level={4} style={{ margin: 0 }}>
                DesaKU
              </Title>
            </Space>
          </Col>
          <Col flex="auto">
            <Menu
              mode="horizontal"
              selectable={false}
              items={menuItems}
              onClick={(e) => scrollToId(e.key as string)}
              style={{ borderBottom: "none" }}
            />
          </Col>
          <Col flex="none">
            <Space>
              <Button onClick={() => navigate("/auth")}>Masuk</Button>
              <Button type="primary" onClick={() => navigate("/auth")}>
                Mulai Sekarang
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            minHeight: "82vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            background: `linear-gradient(180deg, ${token.colorBgLayout} 0%, ${token.colorBgContainer} 100%)`,
          }}
        >
          <img
            src="/assets/indonesia-outline.svg"
            alt="Peta Indonesia"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.08,
              transform: "scale(1.1)",
              filter: "grayscale(100%)",
              pointerEvents: "none",
            }}
          />
          <Row
            gutter={[24, 24]}
            style={{
              padding: "80px 24px",
              width: "100%",
              position: "relative",
            }}
            justify="center"
          >
            <Col xs={24} md={20} lg={16} xl={14}>
              <Space
                direction="vertical"
                size={16}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Title style={{ marginBottom: 0 }}>
                  Desaku Digital Administration
                </Title>
                <Paragraph
                  style={{ fontSize: 18, color: token.colorTextSecondary }}
                >
                  Transformasi layanan administrasi desa yang cepat, transparan,
                  dan terintegrasi. Ajukan surat, pantau progres, dan selesaikan
                  urusan Anda tanpa antri.
                </Paragraph>
                <Space
                  size="middle"
                  style={{ justifyContent: "center", width: "100%" }}
                >
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
              </Space>
            </Col>
          </Row>
        </section>

        {/* Tentang */}
        <section id="tentang" style={{ padding: "64px 24px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center" }}>
                Kenapa Desaku?
              </Title>
              <Paragraph
                style={{ textAlign: "center", color: token.colorTextSecondary }}
              >
                Platform modern untuk administrasi desa. Memudahkan warga dan
                perangkat desa berinteraksi dalam satu sistem yang aman dan
                efisien.
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <ThunderboltOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Cepat & Efisien
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Proses digital dari pengajuan hingga penerbitan dokumen
                      tanpa perlu datang ke kantor.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <SafetyCertificateOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Transparan
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Lacak status pengajuan secara real‑time dan terima
                      notifikasi setiap perubahan.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <LockOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Aman
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Keamanan data terjamin dengan kontrol akses dan jejak
                      audit yang jelas.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <CloudSyncOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Terintegrasi
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Integrasi layanan dan data antar perangkat untuk
                      meminimalkan input berulang.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <TeamOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Kolaboratif
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Alur persetujuan lintas perangkat desa yang jelas dan
                      terdokumentasi.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card bordered hoverable>
                <Space size={12} align="start">
                  <PhoneOutlined
                    style={{ fontSize: 28, color: token.colorPrimary }}
                  />
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      Mobile‑friendly
                    </Title>
                    <Paragraph style={{ marginBottom: 0 }}>
                      Bisa diakses di mana saja, kapan saja dari perangkat Anda.
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Statistik */}
        <section
          style={{ padding: "48px 24px", background: token.colorBgLayout }}
        >
          <Row justify="center" gutter={[24, 24]}>
            <Col xs={12} md={6}>
              <Card bordered={false}>
                <Statistic title="Pengajuan/Bulan" value={1200} suffix="+" />
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

        {/* Alur */}
        <section id="alur" style={{ padding: "64px 24px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center" }}>
                Alur Layanan
              </Title>
              <Paragraph
                style={{ textAlign: "center", color: token.colorTextSecondary }}
              >
                Lima langkah sederhana untuk menyelesaikan kebutuhan
                administrasi Anda.
              </Paragraph>
              <Steps
                responsive
                style={{ marginTop: 24 }}
                items={[
                  { title: "Masuk", description: "Autentikasi akun Anda" },
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
                  { title: "Selesai", description: "Unduh atau ambil dokumen" },
                ]}
              />
            </Col>
          </Row>
        </section>

        {/* Fitur */}
        <section
          id="fitur"
          style={{ padding: "64px 24px", background: token.colorBgLayout }}
        >
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center" }}>
                Fitur Utama
              </Title>
              <Paragraph
                style={{ textAlign: "center", color: token.colorTextSecondary }}
              >
                Dirancang untuk perangkat desa dan warga dengan antarmuka yang
                intuitif.
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Card
                title={
                  <Space>
                    <ThunderboltOutlined />
                    Pelacakan Real‑time
                  </Space>
                }
                hoverable
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
              >
                Mendukung paraf dan tanda tangan elektronik sesuai ketentuan.
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
              >
                Pengaturan peran perangkat desa dan jalur persetujuan berlapis.
              </Card>
            </Col>
          </Row>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: "64px 24px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center" }}>
                Pertanyaan Umum
              </Title>
              <Paragraph
                style={{ textAlign: "center", color: token.colorTextSecondary }}
              >
                Beberapa hal yang sering ditanyakan.
              </Paragraph>
              <Collapse
                accordion
                items={[
                  {
                    key: "1",
                    label: (
                      <Space>
                        <QuestionCircleOutlined />
                        Bagaimana cara memulai pengajuan?
                      </Space>
                    ),
                    children: (
                      <Paragraph>
                        Klik tombol "Mulai Sekarang", masuk, lalu pilih jenis
                        layanan yang Anda butuhkan.
                      </Paragraph>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <Space>
                        <QuestionCircleOutlined />
                        Apakah dokumen bisa ditandatangani digital?
                      </Space>
                    ),
                    children: (
                      <Paragraph>
                        Ya, sistem mendukung tanda tangan elektronik sesuai
                        kebijakan yang berlaku di desa Anda.
                      </Paragraph>
                    ),
                  },
                  {
                    key: "3",
                    label: (
                      <Space>
                        <QuestionCircleOutlined />
                        Bagaimana memantau status pengajuan?
                      </Space>
                    ),
                    children: (
                      <Paragraph>
                        Anda dapat memantau melalui halaman "Pengajuan Saya"
                        dengan status yang diperbarui real‑time.
                      </Paragraph>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </section>

        {/* CTA Banner */}
        <section style={{ padding: "48px 24px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Card
                style={{ background: token.colorPrimaryBg }}
                bodyStyle={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Space direction="vertical" size={4}>
                  <Title level={3} style={{ margin: 0 }}>
                    Siap memulai transformasi digital?
                  </Title>
                  <Text style={{ color: token.colorTextSecondary }}>
                    Gabung dan rasakan kemudahannya sekarang.
                  </Text>
                </Space>
                <Space>
                  <Button size="large" onClick={() => navigate("/auth")}>
                    Masuk
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/auth")}
                  >
                    Daftar/Masuk
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>

        <Divider style={{ margin: 0 }} />

        {/* Kontak */}
        <section id="kontak" style={{ padding: "48px 24px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={3}>Kontak</Title>
              <Paragraph>
                Untuk informasi lebih lanjut, silakan hubungi perangkat desa
                Anda atau admin sistem.
              </Paragraph>
            </Col>
          </Row>
        </section>
      </Content>

      {/* Footer */}
      <Footer style={{ background: token.colorBgContainer }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Space size={8} align="center">
              <RocketOutlined
                style={{ fontSize: 20, color: token.colorPrimary }}
              />
              <Title level={5} style={{ margin: 0 }}>
                DesaKU
              </Title>
            </Space>
            <Paragraph
              style={{ marginTop: 12, color: token.colorTextSecondary }}
            >
              Administrasi desa yang cepat, transparan, dan aman.
            </Paragraph>
          </Col>
          <Col xs={12} md={8}>
            <Title level={5}>Tautan</Title>
            <Space direction="vertical">
              <AntLink onClick={() => scrollToId("tentang")}>Tentang</AntLink>
              <AntLink onClick={() => scrollToId("fitur")}>Fitur</AntLink>
              <AntLink onClick={() => scrollToId("faq")}>FAQ</AntLink>
            </Space>
          </Col>
          <Col xs={12} md={8}>
            <Title level={5}>Kebijakan</Title>
            <Space direction="vertical">
              <AntLink href="#">Kebijakan Privasi</AntLink>
              <AntLink href="#">Syarat & Ketentuan</AntLink>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Text type="secondary">
          © {new Date().getFullYear()} DesaKU. All rights reserved.
        </Text>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
