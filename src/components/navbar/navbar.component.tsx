import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FlexWrap, LogoWrap, NavbarComponent, IconStyle } from './navbar.style'

export const Navbar = () => {
    return (
        <NavbarComponent>
            <FlexWrap>
                <LogoWrap>
                    <LinkedinOutlined style={IconStyle.linkedin} />
                    Candidate testing project
                </LogoWrap>
                <Button
                    onClick={() =>
                        (window.location.href =
                            'https://github.com/MuhammadMurodbek/murod_candidate_test.git')
                    }
                >
                    <GithubOutlined style={IconStyle.github} />
                </Button>
            </FlexWrap>
        </NavbarComponent>
    )
}
