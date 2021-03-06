import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled from "styled-components";

import { chatApi } from "src/api";
import { BottomSection, ChatListItem } from "@components/chat";
import useInfiniteScroll from "@hooks/useInfiniteScroll";

interface Props {
	sendMessage?: (inputChat: string) => void;
	roomId?: string | null;
	receivedChatData?: {
		room_id: string;
		sender: string;
		content: string;
		type: string;
		created_at: string;
	};
}

interface ChatListType {
	room_id: string;
	sender: string;
	content: string;
	read_at?: string;
	created_at: string;
	type?: string;
}

function Chat({ sendMessage, roomId, receivedChatData }: Props) {
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const { sellerName, buyerName } = useSelector((state: RootState) => state.articleInfo);
	const { username } = useSelector((state: RootState) => state.userInfo);
	const [showChatList, setShowChatList] = useState<ChatListType[]>([]);
	let name = "";
	if (username === buyerName) {
		name = sellerName;
	} else {
		name = buyerName;
	}

	const {
		setTarget,
		savedChatMessage,
		isLoading,
		currentPage,
		setCurrentPage,
		setSavedChatMessage,
		prevScrollHeight,
		setPrevScrollHeight,
	} = useInfiniteScroll({
		roomId,
		chatBoxRef,
		requestApi: (roomId, currentPage) => {
			return chatApi.getChatList(roomId, currentPage);
		},
	});

	useEffect(() => {
		setCurrentPage(0);
		setSavedChatMessage([]);
		setShowChatList([]);
	}, [roomId]);

	useEffect(() => {
		if (currentPage) {
			setShowChatList((prev) => [...prev, ...savedChatMessage]);
		} else {
			setShowChatList(savedChatMessage);
		}
	}, [savedChatMessage]);

	useEffect(() => {
		if (receivedChatData) {
			setShowChatList((prev) => [receivedChatData, ...prev]);
		}
	}, [receivedChatData]);

	useEffect(() => {
		handleScroll();
	}, [showChatList]);

	const handleScroll = () => {
		if (chatBoxRef.current) {
			if (prevScrollHeight) {
				chatBoxRef.current.scrollTo({
					top: chatBoxRef.current.scrollHeight - prevScrollHeight,
				});
				return setPrevScrollHeight(null);
			}

			chatBoxRef.current.scrollTo({
				top: chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight,
			});
		}
	};

	return (
		<Container>
			<Title>{name}</Title>
			<Content>
				{roomId && (
					<>
						<TopSection ref={chatBoxRef}>
							{<div ref={setTarget}>{isLoading && <p></p>}</div>}
							<ul>
								{showChatList &&
									showChatList
										.slice(0)
										.reverse()
										.map((chat, idx) => <ChatListItem key={idx} chat={chat} />)}
							</ul>
						</TopSection>
						<BottomSection sendMessage={sendMessage} />
					</>
				)}
			</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 60rem;
	height: 100%;
	display: flex;
	flex-direction: column;

	@media ${(props) => props.theme.tabletS} {
		width: 40rem;
		height: 50rem;
		border-bottom: solid 2px #d3d3d3;
	}
`;

const Title = styled.div`
	width: 100%;
	height: 8rem;
	display: flex;
	align-items: center;
	font-size: 2rem;
	font-weight: bold;
	padding-left: 2rem;
	border-bottom: solid 2px #d3d3d3;

	@media ${(props) => props.theme.tabletS} {
		justify-content: center;
		padding-left: none;
	}
`;

const Content = styled.div`
	height: 100%;
	min-height: 5rem;
	margin-top: auto;
	display: flex;
	flex-direction: column;
`;

const TopSection = styled.div`
	height: 100%;
	display: flex;
	margin: 1rem 0;
	flex-direction: column;
	overflow: auto;

	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
  }

	::-webkit-scrollbar-track {
    background-color: #fff;
`;

export default Chat;
