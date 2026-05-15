import './UserInfo.css';

interface UserProfile {
  profileImage: string;
  nickname: string;
  email: string;
  name: string;
  gender: 'male' | 'female' | string;
  birthdate: string;
  phone: string;
}

interface UserInfoProps {
  userData: UserProfile;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const formatGender = (gender: string) => {
    if (gender === 'male') return '남성';
    if (gender === 'female') return '여성';
    return gender;
  };

  const infoList = [
    { label: '이름', value: userData.name, hasEdit: false },
    { label: '닉네임', value: userData.nickname, hasEdit: true },
    { label: '성별', value: formatGender(userData.gender), hasEdit: false },
    { label: '생년월일', value: userData.birthdate.replaceAll('-', '.'), hasEdit: false },
    { label: '휴대폰번호', value: userData.phone, hasEdit: true },
    { label: '이메일', value: userData.email, hasEdit: false },
  ];

  return (
    <section className="info-card">
      <h3 className="card-title">회원정보</h3>
      <div className="info-list">
        {infoList.map((info, index) => (
          <div key={index} className="info-row">
            <span className="info-label">{info.label}</span>
            <span className="info-value">{info.value}</span>
            <div className="btn-area">
              {info.hasEdit && <button className="edit-btn">수정</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserInfo;
