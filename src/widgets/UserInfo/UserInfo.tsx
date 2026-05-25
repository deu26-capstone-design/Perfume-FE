import InlineEdit from '@features/inline-edit/InlineEdit';
import { updateMe } from '@features/auth/model/authApi';
import './UserInfo.css';

interface UserProfile {
  profileImage: string;
  nickname: string;
  email: string;
  name: string;
  gender: 'M' | 'F' | string;
  birthdate: string;
  phone: string;
}

interface UserInfoProps {
  userData: UserProfile;
  onUpdateSuccess?: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData, onUpdateSuccess }) => {
  const formatGender = (gender: string) => {
    if (gender === 'M') return '남성';
    if (gender === 'F') return '여성';
    return '선택안함';
  };

  const handleSave = async (field: 'nickname' | 'phone', newValue: string) => {
    try {
      const payload = {
        nickname: field === 'nickname' ? newValue : userData.nickname,
        phoneNumber: field === 'phone' ? newValue : userData.phone,
      };
      await updateMe(payload);
      if (onUpdateSuccess) {
        onUpdateSuccess();
      } else {
        alert('정보가 수정되었습니다.');
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 409) {
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        alert('정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
      throw error;
    }
  };

  const infoList = [
    { label: '이름', value: userData.name, hasEdit: false },
    {
      label: '닉네임',
      value: userData.nickname,
      hasEdit: true,
      isPhone: false,
      onSave: (val: string) => handleSave('nickname', val),
    },
    { label: '성별', value: formatGender(userData.gender), hasEdit: false },
    { label: '생년월일', value: userData.birthdate.replaceAll('-', '.'), hasEdit: false },
    {
      label: '휴대폰번호',
      value: userData.phone,
      hasEdit: true,
      isPhone: true,
      onSave: (val: string) => handleSave('phone', val),
    },
    { label: '이메일', value: userData.email, hasEdit: false },
  ];

  return (
    <section className="info-card">
      <h3 className="card-title">회원정보</h3>
      <div className="info-list">
        {infoList.map((info, index) =>
          info.hasEdit ? (
            <InlineEdit
              key={index}
              label={info.label}
              initialValue={info.value}
              isPhone={info.isPhone}
              onSave={info.onSave!}
            />
          ) : (
            <div key={index} className="info-row">
              <span className="info-label">{info.label}</span>
              <div className="info-content-area">
                <div className="info-display-mode">
                  <span className="info-value">{info.value}</span>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default UserInfo;
