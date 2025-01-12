import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Table, Typography, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, TrophyOutlined } from '@ant-design/icons';
import { getTournamentbyMonth, getTotalTournaments, getTotalUsers, getTotalUsersActive, getFundAdmin } from '../../utils/admin';
import dayjs from 'dayjs'; // Import dayjs
import { amountFormatting } from "../../utils/formatHelper";

const { Title } = Typography;

const Statitical = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tournamentData, setTournamentData] = useState({ total: 0, list: [] });
  const [totalTournaments, setTotalTournaments] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersActive, setTotalUsersActive] = useState(0);
  const [totalFund, setTotalFund] = useState(0);

  // Hàm lấy dữ liệu giải đấu
  const fetchTournamentData = async (date) => {
    try {
      let formattedDate = '';
      if (date) {
        formattedDate = date.format('YYYY-MM');
      }

      const res = await getTournamentbyMonth(formattedDate || undefined);
      if (res?.data?.message === "No tournaments found.") {
        setTournamentData({ total: 0, list: [] });
        return;
      }

      const tournaments = res?.data?.$values || [];
      const formattedTournaments = tournaments.map((tournament) => {
        const startDate = dayjs(tournament.startDate).startOf('day');
        const endDate = dayjs(tournament.endDate).startOf('day');
        const currentDate = dayjs().startOf('day');
        const validEndDate = endDate.isValid() ? endDate : startDate;

        let status = '';
        if (startDate.isAfter(currentDate)) {
          status = 'Sắp diễn ra';
        } else if (startDate.isBefore(currentDate) && validEndDate.isAfter(currentDate)) {
          status = 'Đang diễn ra';
        } else if (validEndDate.isBefore(currentDate)) {
          status = 'Đã kết thúc';
        } else if (startDate.isSame(currentDate, 'day')) {
          status = 'Bắt đầu hôm nay';
        } else if (validEndDate.isSame(currentDate, 'day')) {
          status = 'Kết thúc hôm nay';
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

      setTournamentData({ total: tournaments.length, list: formattedTournaments });
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setTournamentData({ total: 0, list: [] });
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: tournamentData.list
        .map((item) => ({ text: item.name, value: item.name }))
        .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i),
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) =>
        dayjs(a.startDate, 'DD/MM/YYYY').toDate() - dayjs(b.startDate, 'DD/MM/YYYY').toDate(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) =>
        dayjs(a.endDate, 'DD/MM/YYYY').toDate() - dayjs(b.endDate, 'DD/MM/YYYY').toDate(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Sắp diễn ra', value: 'Sắp diễn ra' },
        { text: 'Đang diễn ra', value: 'Đang diễn ra' },
        { text: 'Bắt đầu hôm nay', value: 'Bắt đầu hôm nay' },
        { text: 'Kết thúc hôm nay', value: 'Kết thúc hôm nay' },
        { text: 'Đã kết thúc', value: 'Đã kết thúc' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = '';
        if (status === 'Sắp diễn ra') color = 'orange';
        else if (['Đang diễn ra', 'Bắt đầu hôm nay'].includes(status)) color = 'green';
        else color = 'red';
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: 'Số đội tham gia',
      dataIndex: 'participants',
      key: 'participants',
      sorter: (a, b) => a.participants - b.participants,
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
          allowClear={true}
          value={selectedDate}
        />
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Doanh Thu"
              value={amountFormatting(totalFund)}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Người Dùng Hoạt Động"
              value={(totalUsersActive / totalUsers) * 100}
              precision={0}
              valueStyle={{
                color: (totalUsersActive / totalUsers) * 100 === 100 ? '#3f8600' : '#cf1322',
              }}
              prefix={
                (totalUsersActive / totalUsers) * 100 === 100 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
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
        {tournamentData.total === 0 && (
          <div style={{ textAlign: 'center', marginTop: 16, color: 'red', fontSize: '24px' }}>
            <p>Không có giải đấu trong tháng này.</p>
          </div>
        )}
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Thống kê trạng thái giải đấu">
            <List
              size="small"
              dataSource={[
                {
                  text: 'Đang diễn ra',
                  count: tournamentData.list.filter(
                    (item) => item.status === 'Đang diễn ra' || item.status === 'Bắt đầu hôm nay'
                  ).length,
                },
                {
                  text: 'Sắp diễn ra',
                  count: tournamentData.list.filter((item) => item.status === 'Sắp diễn ra').length,
                },
                {
                  text: 'Đã kết thúc',
                  count: tournamentData.list.filter((item) => item.status === 'Đã kết thúc').length,
                },
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
