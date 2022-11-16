import { FC, useState } from 'react';
import { RiDiscussFill } from 'react-icons/ri';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs'


const ProfileDetails: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <section className='profiledetails'>
            <header>
                <h1>Ho Chi Hang</h1>
            </header>
            <ul role='tablist' className='profiledetails__tablist'>
                <li role='tab'>
                    <h2>23</h2>
                    <div>
                        <RiDiscussFill />
                        Discussions
                    </div>
                </li>
                <li role='tab'>
                    <h2>123</h2>
                    <div>
                        <BsFillPersonCheckFill />
                        Followers
                    </div>
                </li>
                <li role='tab'>
                    <h2>223</h2>
                    <div>
                        <BsFillPersonPlusFill />
                        Following
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default ProfileDetails;