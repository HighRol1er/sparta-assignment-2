import { screen } from '@testing-library/react';

import customRender from '@/utils/test/render';
import { EmptyNotice } from '../EmptyNotice';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
  // Arrange: EmptyNotice 컴포넌트를 렌더링
  const { user } = await customRender(<EmptyNotice />);

  // Act: "홈으로 가기" 텍스트를 가진 요소를 클릭
  const homeButton = screen.getByText('홈으로 가기');
  await user.click(homeButton);
  // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
  expect(mockedUseNavigate).toHaveBeenCalledWith('/');
});
