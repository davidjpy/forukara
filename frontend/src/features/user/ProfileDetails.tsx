import { FC } from 'react';
import { FaCalendarAlt, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im'
import { MdEdit, MdWork } from 'react-icons/md';
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import moment from 'moment';

import { User } from '@common/utilities/types';
import default_avatar from '@media/images/default_avatar.webp';
import ProfileTabBar from './ProfileTabBar';
import { useAppSelector } from '@app/hooks';
import { useNavigate } from 'react-router-dom';

type Props = {
    user: User;
    isLoading: boolean;
};

const ProfileDetails: FC<Props> = ({ user, isLoading }: Props) => {

    const account = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <section className={isLoading ? 'profile-dls' : 'profile-dls profile-dls--loaded'}>
            <div className={isLoading ? 'profile-dls__wrapper' : 'profile-dls__wrapper profile-dls__wrapper--loaded'}>
                {
                    account.id === user?.id &&
                    <button onClick={() => navigate('/settings/edit')} title='Edit your profile' aria-label='Edit Your Profile' className='profile-dls__btn profile-dls__btn--edit'>
                        <MdEdit aria-hidden={true} size={20} />
                    </button>
                }
                <figure className={isLoading ? 'profile-dls__figure' : 'profile-dls__figure profile-dls__figure--loaded'}>
                    <div className='profile-dls__btn-groups'>
                        <a aria-label='twitter profile' title='Open twitter profile in new tab' target='_blank' rel="noreferrer"
                            href={user?.profile.socialMedia!.twitter ? user?.profile.socialMedia!.twitter : undefined} tabIndex={user?.profile.socialMedia!.twitter ? 0 : -1}
                            className={user?.profile.socialMedia!.twitter
                                ? 'profile-dls__btn profile-dls__btn--tw profile-dls__btn--tw-active'
                                : 'profile-dls__btn profile-dls__btn--tw profile-dls__btn-disabled'
                            }
                        >
                            <AiOutlineTwitter aria-hidden={true} size={20} />
                        </a>
                        <a aria-label='linkedin profile' title='Open Linkedin profile in new tab' target='_blank' rel="noreferrer"
                            href={user?.profile.socialMedia!.linkedin ? user?.profile.socialMedia!.linkedin : undefined} tabIndex={user?.profile.socialMedia!.linkedin ? 0 : -1}
                            className={user?.profile.socialMedia!.linkedin
                                ? 'profile-dls__btn profile-dls__btn--ln profile-dls__btn--ln-active'
                                : 'profile-dls__btn profile-dls__btn--ln profile-dls__btn-disabled'
                            }
                        >
                            <FaLinkedinIn aria-hidden={true} size={20} />
                        </a>
                        <a aria-label='youtube profile' title='Open Youtube channel in new tab' target='_blank' rel="noreferrer"
                            href={user?.profile.socialMedia!.youtube ? user?.profile.socialMedia.youtube : undefined} tabIndex={user?.profile.socialMedia!.youtube ? 0 : -1}
                            className={user?.profile.socialMedia!.youtube
                                ? 'profile-dls__btn profile-dls__btn--yt profile-dls__btn--yt-active'
                                : 'profile-dls__btn profile-dls__btn--yt profile-dls__btn-disabled'
                            }
                        >
                            <FaYoutube aria-hidden={true} size={23} />
                        </a>
                        <a aria-label='facebook profile' title='Open Facebook profile in new tab' target='_blank' rel="noreferrer"
                            href={user?.profile.socialMedia!.facebook ? user?.profile.socialMedia.facebook : undefined} tabIndex={user?.profile.socialMedia!.facebook ? 0 : -1}
                            className={user?.profile.socialMedia!.facebook
                                ? 'profile-dls__btn profile-dls__btn--fb profile-dls__btn--fb-active'
                                : 'profile-dls__btn profile-dls__btn--fb profile-dls__btn-disabled'
                            }
                        >
                            <FaFacebookF aria-hidden={true} size={20} />
                        </a>
                        <a aria-label='instagram profile' title='Open Instagram profile in new tab' target='_blank' rel="noreferrer"
                            href={user?.profile.socialMedia!.instagram ? user?.profile.socialMedia.instagram : undefined} tabIndex={user?.profile.socialMedia!.instagram ? 0 : -1}
                            className={user?.profile.socialMedia!.instagram
                                ? 'profile-dls__btn profile-dls__btn--ig profile-dls__btn--ig-active'
                                : 'profile-dls__btn profile-dls__btn--ig profile-dls__btn-disabled'
                            }
                        >
                            <AiOutlineInstagram aria-hidden={true} size={28} />
                        </a>
                    </div>
                    <div className='profile-dls__at-wrapper'>
                        <img alt={!user?.profile.avatar ? default_avatar : user?.profile.avatar} src={!user?.profile.avatar ? default_avatar : user?.profile.avatar} />
                    </div>
                    <figcaption>
                        {
                            user?.profile.preferredName
                                ? `${user?.profile.username}, ${user?.profile.preferredName}`
                                : user?.profile.username
                        }
                    </figcaption>
                    <ul className='profile-dls__ul'>
                        {user?.profile.occupation &&
                            <li>
                                <MdWork aria-hidden={true} className='profile-dls__icon' />
                                {user?.profile.occupation}
                            </li>
                        }

                        {user?.profile.location &&
                            <li>
                                <ImLocation2 aria-hidden={true} className='profile-dls__icon' />
                                {user?.profile.location}
                            </li>
                        }
                        
                        {user?.createdAt &&
                            <li>
                                <FaCalendarAlt aria-hidden={true} className='profile-dls__icon' />
                                {user?.createdAt && moment(`${user.createdAt}`).format('Do MMM, YYYY')}
                            </li>
                        }
                    </ul>
                </figure>
                <ProfileTabBar />
            </div>
        </section>
    );
}

export default ProfileDetails;

