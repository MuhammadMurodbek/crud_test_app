import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FlexWrap, LogoWrap, NavbarComponent } from './navbar.style'

export const Navbar = () => {
    return (
        <NavbarComponent>
            <FlexWrap>
                <LogoWrap>
                    <LinkedinOutlined
                        style={{
                            color: '#1677ff',
                            fontSize: '22px',
                            marginRight: 10,
                        }}
                    />
                    Candidate testing project
                </LogoWrap>
                <Button>
                    <GithubOutlined
                        style={{
                            fontSize: '20px',
                        }}
                    />
                </Button>
            </FlexWrap>
        </NavbarComponent>
    )
}
