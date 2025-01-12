import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import  from "./components/Layout";
import Home from "./containers/Home/Homepage";
import HomePageLogin from "./containers/Home/HomepageLogin";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import ResetPassword from "./containers/ResetPassword";
import UserAbout from "./containers/UserAbout/UserAbout";
import { ProtectRoutes } from "./hooks/ProtectRoutes";
import AppProvider from "./hooks";
// import MyCalendar from "./components/MyCalendar";
import MyProfile from "./containers/MyProfile/Profile";
import Admin from "./containers/Admin";
import Header from "./components/Header/Hearder";
import SportsBetting from "./containers/SportsBetting/SportsBetting";
import SportsBettingClub from "./containers/SportsBettingClub/SportsBetting";
import SportsBettingMyClub from "./containers/SportsBettingMyClub/SportsBetting";
import ManagementSportsBetting from "./containers/ManagementSportsBetting/SportsBetting";
import ManagementTournament from "./containers/ManagementTournament/ClubPage";
import MyBetting from "./containers/MyBetting/SportsBetting";
import Club from "./containers/Club/ClubPage";
import SportProfile from "./containers/SportProfile/SportProfile";
import AddSportProfile from "./containers/AddSportProfle/SportProfile";
import DetailClub from "./containers/DetailClub/Match";
import SportClubCreation from "./containers/Createclub/SportClubCreation"
import AccountPage from "./containers/AccountPage/AccountPage";
import AccountSport from "./containers/AccountPage/AccountSport";
import AddSportAcc from "./containers/AccountPage/AddSportAcc";
import MemberMatch from "./containers/MemberMatch/MemberMatch";
import MemberMatchClub from "./containers/MemberMatchClub/MemberMatch";
import Match from "./containers/DetailMatch/Match";
import DetailMatchClub from "./containers/DetailMatchClub/Match";

import MyClub from "./containers/MyClub/ClubPage";
import MyClubJoined from "./containers/MyClubJoined/ClubPage";
import DetailMyClub from "./containers/DetailMyClub/Match";
import DetailMyBetting from "./containers/DetailMyBetting/Match";
import DetailJoined from "./containers/DetailJoined/Match"
import MemberMyMatch from "./containers/MemberMyMatch/MemberMatch";
import MemberMyClub from "./containers/MemberMyClub/MemberClub";
import MemberMyClubJoined from "./containers/MemberMyClubJoined/MemberClub"
import RequestJoinClub from "./containers/RequestJoinClub/MemberClub";
import JoinActivity from "./containers/JoinActivity/MemberMatch";
import CreateSportEvent from "./containers/CreateSportEvent/CreateSportEvent";
import CreateSportEventClub from "./containers/CreateSportEventClub/CreateSportEvent";
import ResultMatch from "./containers/ResultMatch/ResultMatch";
import ResultMyMatch from "./containers/ResultMyMatch/ResultMatch";
import Security from "./containers/Security/Security";
import UpdateSportEvent from "./containers/UpdateSportEvent/UpdateSportEvent";
import UpdateSportEventClub from "./containers/UpdateSportEventClub/UpdateSportEvent";
import TournamentForm from "./containers/CreateTournament/TournamentForm";
import MyTournament from "./containers/MyTournament/ClubPage";
import UpdateTournament from "./containers/UpdateTournament/TournamentForm";
import DetailTournament from "./containers/DetailTournament/Match"
import TournamentOut from "./containers/TournamentOut/ClubPage";
import DetailTournamentJoin from "./containers/DetailTournamentJoin/Match";
import TournamentBracket from "./containers/TournamentBracket/TournamentBracket";
import ViewTournamentBracket from "./containers/ViewTournamentBracket/ViewTournamentBracket"
import ViewListTeam from "./containers/ViewListTeam/Match";
import SportClubUpdate from "./containers/UpdateClub/SportClubUpdate";
import DetailMyClubJoined from "./containers/DetailMyClubJoined/Match";
import DetailMatchMyClub from "./containers/DetailMatchMyClub/Match";
import RoundRobinBracket from "./containers/RoundRobin/RoundRobinBracket";
import RoundRobinBracketJoin from "./containers/RoundRobinJoin/RoundRobinBracket";
import GoogleCallback from './components/GoogleCallback';
// import ViewListMember from "./containers/ViewListMember/Match";
console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);
function App() {
  return (
    
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/sportbetting" element={<SportsBetting />} />
          <Route path="/sportbettingclub/:clubId" element={<SportsBettingClub />} />
          <Route path="/sportbettingmyclub/:clubId" element={<SportsBettingMyClub />} />
          <Route path="/sportprofile" element={<SportProfile />} />
          <Route path="/add-sport" element={<AddSportProfile />} />
          <Route path="/management-betting" element={<ManagementSportsBetting />} />
          <Route path="/mybetting" element={<MyBetting />} />
          <Route path="club" element={<Club />} />
          <Route path="detailclub/:clubId" element={<DetailClub />} />
          <Route path="myclub" element={<MyClub />} />
          <Route path="myclubjoined" element={<MyClubJoined />} />
          <Route path="myclubdetail/:clubId" element={<DetailMyClub />} />
          <Route path="/membermyclub/:clubId" element={<MemberMyClub />} />
          <Route path="/membermyclubjoined/:clubId" element={<MemberMyClubJoined />} />
          <Route path="/approveclub/:clubId" element={<RequestJoinClub />} />
          <Route path="/updateclub/:clubId" element={<SportClubUpdate />} />
          <Route path="/myclubdetailjoined/:clubId" element={<DetailMyClubJoined />} />
          <Route path="/home" element={<HomePageLogin />} />
          <Route path="/createclub" element={<SportClubCreation />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/accountsports" element={<AccountSport />} />
          <Route path="/addsportsacc" element={<AddSportAcc />} />
          <Route path="/membermatch/:activityId" element={<MemberMatch />} />
          <Route path="/membermatchclub/:activityclubId" element={<MemberMatchClub />} />
          <Route path="/membermymatch/:activityId" element={<MemberMyMatch />} />
          <Route path="/approvemember/:activityId" element={<JoinActivity />} />
          <Route path="/detailmatch/:activityId" element={<Match />} />
          <Route path="/detailmatchclub/:activityclubId" element={<DetailMatchClub />} />
          <Route path="/detailmymatch/:activityId" element={<DetailMyBetting />} />
          <Route path="/detailmatchmyclub/:activityclubId" element={<DetailMatchMyClub />} />
          <Route path="/detailmatchjoined/:activityId" element={<DetailJoined />} />
          <Route path="/createsportevent" element={<CreateSportEvent />} />
          <Route path="/createsporteventclub/:clubId" element={<CreateSportEventClub />} />
          <Route path="/auth/google-callback" element={<GoogleCallback />} />
          <Route path="/updatesportevent/:activityId" element={<UpdateSportEvent />} />
          <Route path="/updatesporteventclub/:activityclubId" element={<UpdateSportEventClub />} />
          <Route path="/resultmatch/:activityId" element={<ResultMatch />} />
          <Route path="/resultmymatch/:activityId" element={<ResultMyMatch />} />
          <Route path="/security" element={<Security />} />
          <Route path="/createTournament" element={<TournamentForm />} />
          <Route path="/mytournament" element={<MyTournament />} />
          <Route path="/detailtournament/:tournamentId" element={<DetailTournament />} />
          <Route path="/detailtournamentjoin/:tournamentId" element={<DetailTournamentJoin />} />
          <Route path="/managementtournament" element={<ManagementTournament />} />
          <Route path="/updateTournament/:tournamentId" element={<UpdateTournament />} />
          <Route path="/Tournamentall" element={<TournamentOut />} />
          <Route path="/TournamentBracket/:tournamentId" element={<TournamentBracket />} />
          <Route path="/RoundRobinBracket/:tournamentId" element={<RoundRobinBracket />} />
          <Route path="/RoundRobinBracketJoin/:tournamentId" element={<RoundRobinBracketJoin />} />
          <Route path="/ViewTournamentBracket/:tournamentId" element={<ViewTournamentBracket />} />
          <Route path="/ViewListTeam/:tournamentId" element={<ViewListTeam />} />
          
          <Route path="/admin" element={<Admin />} />
          
          <Route element={<ProtectRoutes />}>
            <Route path="user-about" element={<UserAbout />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
