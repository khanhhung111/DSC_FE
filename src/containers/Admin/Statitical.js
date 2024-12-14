import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Table, Typography, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, TrophyOutlined } from '@ant-design/icons';
import { getTournamentbyMonth, getTotalTournaments, getTotalUsers, getTotalUsersActive,getFundAdmin } from '../../utils/admin';
import dayjs from 'dayjs'; // Import dayjs

const { Title } = Typography;

const Statitical = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Tháng hiện tại mặc định
  const [tournamentData, setTournamentData] = useState({ total: 0, list: [] }); // State lưu dữ liệu từ API
  const [totalTournaments, setTotalTournaments] = useState(0); // Tổng số giải đấu
  const [totalUsers, setTotalUsers] = useState(0); // Tổng số người dùng
  const [totalUsersActive, setTotalUsersActive] = useState(0);
  const [totalFund, setTotalFund] = useState(0);

  // Hàm lấy dữ liệu từ API
  const fetchTournamentData = async (date) => {
    try {
      let formattedDate = '';
      if (date) {
        // Nếu có chọn tháng, format theo tháng
        formattedDate = date.format('YYYY-MM');
      }
  
      // Gọi API: Nếu không có formattedDate -> get tất cả tournaments
      const res = await getTournamentbyMonth(formattedDate || undefined);
      const tournaments = res?.data?.$values || [];
  
      const formattedTournaments = tournaments.map((tournament) => {
        const startDate = dayjs(tournament.startDate).startOf('day');
        const endDate = dayjs(tournament.endDate).startOf('day');
        const currentDate = dayjs().startOf('day');
        const validEndDate = endDate.isValid() ? endDate : startDate;
  
        let status = '';
        if (startDate.isAfter(currentDate)) {
          status = 'Sắp bắt đầu';
        } else if (startDate.isBefore(currentDate) && validEndDate.isAfter(currentDate)) {
          status = 'Đang diễn ra';
        } else if (validEndDate.isBefore(currentDate)) {
          status = 'Đã kết thúc';
        }
  
        return {
          id: tournament.tournamentId,
          name: tournament.name,
          startDate: startDate.format('DD/MM/YYYY'),
          endDate: validEndDate.format('DD/MM/YYYY'),
          status,
          participants: tournament.numberOfTeams,
        };
      });
  
      setTournamentData({
        total: tournaments.length,
        list: formattedTournaments,
      });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };
  
  const fetchTotalData = async () => {
    try {
      const [tournamentsRes, usersRes, userActive, totalFund] = await Promise.all([
        getTotalTournaments(),
        getTotalUsers(),
        getTotalUsersActive(),
        getFundAdmin(),
      ]);

      setTotalTournaments(tournamentsRes?.data?.totalTournaments || 0);
      setTotalUsers(usersRes?.data?.totalUsers || 0);
      setTotalUsersActive(userActive?.data?.totalUsers || 0);
      setTotalFund(totalFund?.data?.totalFund || 0);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tổng:', error);
    }
  };

  useEffect(() => {
    fetchTotalData();
  }, []); 

  useEffect(() => {
    fetchTournamentData(selectedDate);
  }, [selectedDate]);

  const handleMonthChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const tournamentColumns = [
    {
      title: 'Tên giải đấu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Số đội tham gia',
      dataIndex: 'participants',
      key: 'participants',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={2}>Thống Kê</Title>
        <DatePicker
  picker="month"
  placeholder="Chọn tháng"
  onChange={handleMonthChange}
  allowClear={true} // Cho phép chọn lại để hiển thị tất cả giải đấu
  value={selectedDate} // Chỉ hiển thị tháng đã chọn
/>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalFund}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={(totalUsersActive / totalUsers) * 100}
              precision={0}
              valueStyle={{
                color: (totalUsersActive / totalUsers) * 100 === 100 ? '#3f8600' : '#cf1322',
              }}
              prefix={
                (totalUsersActive / totalUsers) * 100 === 100 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng số người dùng" value={totalUsers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Giải Đấu"
              value={totalTournaments}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Danh sách giải đấu trong tháng" style={{ marginBottom: 24 }}>
        <Table
          columns={tournamentColumns}
          dataSource={tournamentData.list}
          rowKey="id"
          pagination={{ pageSize: 3 }}
        />
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Thống kê trạng thái giải đấu">
            <List
              size="small"
              dataSource={[
                { text: 'Đang diễn ra', count: tournamentData.list.filter(item => item.status === 'Đang diễn ra').length },
                { text: 'Sắp diễn ra', count: tournamentData.list.filter(item => item.status === 'Sắp diễn ra').length },
                { text: 'Đã kết thúc', count: tournamentData.list.filter(item => item.status === 'Đã kết thúc').length },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.text}</span>
                  <span>{item.count} giải đấu</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Thống kê số đội tham gia">
            <Statistic
              title="Tổng số đội tham gia các giải"
              value={tournamentData.list.reduce((acc, curr) => acc + curr.participants, 0)}
              suffix="đội"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statitical;
