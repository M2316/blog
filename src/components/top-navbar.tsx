"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebouncedFetch } from "@/app/hooks/useDebounce";
import { titleSearchFetch } from "@/actions/notion";
import { Content } from "@/utils/dataPaser";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/app/store/useGlobalStore";
import { FaEye } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

// 검색 결과 아이템 컴포넌트
function SearchResultItem({ item, onClick }: { item: Content; onClick: (id: string) => void }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center p-2 md:p-3 hover:bg-blue-50 cursor-pointer rounded-md transition-colors duration-150"
    >
      <button
        onClick={() => onClick(item.id)}
        className="flex-1 text-left text-sm md:text-base truncate mr-2 font-medium text-gray-800 hover:text-blue-600 transition-colors"
      >
        {item.title}
      </button>
      <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1 whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full">
        {item.views > 0 ? (
          <>
            {item.views}
            <FaEye className="w-3 h-3 md:w-4 md:h-4" />
          </>
        ) : (
          <>
            0
            <FaEye className="w-3 h-3 md:w-4 md:h-4" />
          </>
        )}
      </span>
    </motion.li>
  );
}

// 검색 결과 목록 컴포넌트
function SearchResultsList({ 
  isLoading, 
  results, 
  notFound, 
  onItemClick 
}: { 
  isLoading: boolean; 
  results: Content[]; 
  notFound: boolean; 
  onItemClick: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-gray-500 text-sm md:text-base">검색 중...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <motion.li 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center p-4 text-sm md:text-base flex flex-col items-center"
      >
        <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p>검색 결과가 없습니다.</p>
      </motion.li>
    );
  }

  return (
    <>
      {results.map((item) => (
        <SearchResultItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </>
  );
}

// 검색 입력 필드 컴포넌트
function SearchInput({ 
  inputRef, 
  defaultValue, 
  onChange, 
  onClose 
}: { 
  inputRef: React.RefObject<HTMLInputElement | null>; 
  defaultValue: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder="검색어를 입력하세요..."
        className="bg-white w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm md:text-base transition-all duration-200"
        onChange={onChange}
      />
      <button 
        onClick={onClose}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <IoClose className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
      </button>
    </div>
  );
}

// 모바일 검색바 컴포넌트
function MobileSearchBar({ 
  containerRef, 
  inputRef, 
  defaultValue, 
  onChange, 
  onClose, 
  isLoading, 
  results, 
  notFound, 
  onItemClick 
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>; 
  inputRef: React.RefObject<HTMLInputElement | null>; 
  defaultValue: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onClose: () => void; 
  isLoading: boolean; 
  results: Content[]; 
  notFound: boolean; 
  onItemClick: (id: string) => void;
}) {
  const handleEventStopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="md:hidden fixed top-[60px] left-0 right-0 z-10 px-3 py-2 bg-white shadow-md"
      onClick={handleEventStopPropagation}
      onTouchStart={handleEventStopPropagation}
    >
      <SearchInput 
        inputRef={inputRef}
        defaultValue={defaultValue}
        onChange={onChange}
        onClose={onClose}
      />
      <motion.ul 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="bg-white w-full mt-2 p-2 border border-gray-100 rounded-lg shadow-lg max-h-[250px] overflow-y-auto backdrop-blur-sm bg-opacity-95"
        onClick={handleEventStopPropagation}
        onTouchStart={handleEventStopPropagation}
      >
        <SearchResultsList 
          isLoading={isLoading}
          results={results}
          notFound={notFound}
          onItemClick={onItemClick}
        />
      </motion.ul>
    </motion.div>
  );
}

// 데스크톱 검색바 컴포넌트
function DesktopSearchBar({ 
  containerRef, 
  inputRef, 
  defaultValue, 
  onChange, 
  onClose, 
  isLoading, 
  results, 
  notFound, 
  onItemClick 
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>; 
  inputRef: React.RefObject<HTMLInputElement | null>; 
  defaultValue: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onClose: () => void; 
  isLoading: boolean; 
  results: Content[]; 
  notFound: boolean; 
  onItemClick: (id: string) => void;
}) {
  const handleEventStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="hidden md:block absolute -top-2 -right-2 w-[350px] md:w-[500px] search-container"
      onClick={handleEventStopPropagation}
    >
      <SearchInput 
        inputRef={inputRef}
        defaultValue={defaultValue}
        onChange={onChange}
        onClose={onClose}
      />
      <motion.ul 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="bg-white w-full mt-2 p-3 border border-gray-100 rounded-lg shadow-lg max-h-[300px] overflow-y-auto backdrop-blur-sm bg-opacity-95"
        onClick={handleEventStopPropagation}
      >
        <SearchResultsList 
          isLoading={isLoading}
          results={results}
          notFound={notFound}
          onItemClick={onItemClick}
        />
      </motion.ul>
    </motion.div>
  );
}

// 검색 기능 훅
function useSearch(searchBarIsOpen: boolean, setSearchBarIsOpen: (isOpen: boolean) => void) {
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lastSearchValue, setLastSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const router = useRouter();

  // 검색바 상태 관리
  useEffect(() => {
    if (!searchBarIsOpen) {
      // 검색바가 닫힐 때 현재 검색 값을 저장
      if (searchBarRef.current) {
        setLastSearchValue(searchBarRef.current.value);
      }
      return;
    }
    
    // 검색바가 열릴 때만 포커스 설정
    if (searchBarRef.current) {
      // 약간의 지연을 두어 애니메이션이 완료된 후 포커스 설정
      const timer = setTimeout(() => {
        searchBarRef.current?.focus();
        // 이전 검색 값이 있으면 입력 필드에 설정
        if (lastSearchValue) {
          searchBarRef.current!.value = lastSearchValue;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [searchBarIsOpen, lastSearchValue]);

  // 검색 결과 가져오기
  useEffect(() => {
    if (!searchBarIsOpen) return;
    
    const fetchResults = async () => {
      if (searchQuery === "") {
        setSearchResults([]);
        setSearchNotFound(false);
        return;
      }
      
      try {
        setIsSearchLoading(true);
        const response = await titleSearchFetch<Content[]>(searchQuery);
        setSearchResults(response);
        setSearchNotFound(response.length === 0);
      } catch (e) {
        console.error("Error fetching search results:", e);
        setSearchResults([]);
        setSearchNotFound(true);
      } finally {
        setIsSearchLoading(false);
      }
    };
    
    const timer = setTimeout(() => {
      fetchResults();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, searchBarIsOpen]);

  // 입력 값 변경 핸들러 - 디바운스 적용
  const handleInputChange = () => {
    // 입력 필드의 값은 직접 DOM에서 관리하고, 검색 쿼리만 상태로 관리
    debouncedFetchHandler();
  };

  const fetchSearchResults = (query: string) => {
    setSearchQuery(query);
  };

  // 디바운스 적용된 검색 핸들러
  const debouncedFetchHandler = useDebouncedFetch(() => {
    // 현재 입력 필드의 값을 가져와서 검색 쿼리로 설정
    const currentValue = searchBarRef.current?.value || "";
    fetchSearchResults(currentValue);
    setIsSearchLoading(true);
    setSearchNotFound(false);
  }, 500); // 500ms 디바운스 적용

  const searchListClickHandler = (postedId: string) => {
    // 검색 결과 클릭 시 검색바를 닫지 않고 유지
    router.push(`/posted/${postedId}`);
  };
  
  // 검색바 토글 핸들러
  const toggleSearchBar = () => {
    setSearchBarIsOpen(!searchBarIsOpen);
  };

  return {
    searchBarRef,
    searchContainerRef,
    lastSearchValue,
    searchResults,
    isSearchLoading,
    searchNotFound,
    handleInputChange,
    searchListClickHandler,
    toggleSearchBar
  };
}

// 반응형 훅
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 컴포넌트 마운트 상태 관리
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // 모바일 환경 감지
  useEffect(() => {
    if (!isMounted) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 초기 체크
    checkMobile();
    
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMounted]);

  return { isMobile, isMounted };
}

// 외부 클릭 처리 훅
function useOutsideClick(
  isMounted: boolean, 
  isMobile: boolean, 
  searchBarIsOpen: boolean, 
  searchContainerRef: React.RefObject<HTMLDivElement | null>, 
  setSearchBarIsOpen: (isOpen: boolean) => void
) {
  // 클릭 이벤트 처리
  const handleClickOutside = useCallback((event: MouseEvent) => {
    // 검색바가 닫혀있으면 처리하지 않음
    if (!searchBarIsOpen) return;
    
    const target = event.target as HTMLElement;
    
    // 검색 컨테이너 내부 클릭은 무시
    if (searchContainerRef.current && searchContainerRef.current.contains(target)) {
      return;
    }
    
    // 검색 토글 버튼 클릭은 무시
    if (target.closest('.search-toggle')) {
      return;
    }
    
    // 그 외 영역 클릭 시 검색바 닫기
    setSearchBarIsOpen(false);
  }, [searchBarIsOpen, setSearchBarIsOpen, searchContainerRef]);

  useEffect(() => {
    if (!isMounted) return;
    
    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    
    // 클린업 함수
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMounted, handleClickOutside]);

  // 터치 이벤트 처리 (모바일 전용)
  const handleTouchOutside = useCallback((event: TouchEvent) => {
    // 검색바가 닫혀있으면 처리하지 않음
    if (!searchBarIsOpen) return;
    
    const target = event.target as HTMLElement;
    
    // 검색 컨테이너 내부 터치는 무시
    if (searchContainerRef.current && searchContainerRef.current.contains(target)) {
      return;
    }
    
    // 검색 토글 버튼 터치는 무시
    if (target.closest('.search-toggle')) {
      return;
    }
    
    // 그 외 영역 터치 시 검색바 닫기
    setSearchBarIsOpen(false);
  }, [searchBarIsOpen, setSearchBarIsOpen, searchContainerRef]);

  useEffect(() => {
    if (!isMounted || !isMobile) return;
    
    // 이벤트 리스너 등록
    document.addEventListener("touchend", handleTouchOutside);
    
    // 클린업 함수
    return () => {
      document.removeEventListener("touchend", handleTouchOutside);
    };
  }, [isMounted, isMobile, handleTouchOutside]);
}

export default function TopNavbar() {
  const { searchBarIsOpen, setSearchBarIsOpen } = useGlobalStore();
  const { isMobile, isMounted } = useResponsive();
  
  const {
    searchBarRef,
    searchContainerRef,
    lastSearchValue,
    searchResults,
    isSearchLoading,
    searchNotFound,
    handleInputChange,
    searchListClickHandler,
    toggleSearchBar
  } = useSearch(searchBarIsOpen, setSearchBarIsOpen);
  
  useOutsideClick(isMounted, isMobile, searchBarIsOpen, searchContainerRef, setSearchBarIsOpen);
  
  // 서버 사이드 렌더링 중에는 아무것도 렌더링하지 않음
  if (!isMounted) {
    return (
      <nav className="py-2 md:py-4 px-3 md:px-5 bg-white shadow-md fixed top-0 w-full z-10 sm:px-10 md:px-20">
        <ul className="max-w-6xl flex justify-between items-center mx-auto relative">
          <li className="text-black flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="logo" width={32} height={32} className="md:w-10 md:h-10" />
              <p className="ml-2 md:ml-3 font-bold text-lg md:text-xl lg:text-2xl">JEALTH BLOG</p>
            </Link>
          </li>
          <li className="relative flex items-center">
            <button
              className="flex items-center justify-center cursor-pointer z-10 search-toggle p-2 rounded-full transition-all duration-200 hover:bg-gray-100 text-gray-600"
              aria-label="검색 열기"
            >
              <BiSearch size={20} className="md:w-5 md:h-5" />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  
  return (
    <>
      <nav className="py-2 md:py-4 px-3 md:px-5 bg-white shadow-md fixed top-0 w-full z-10 sm:px-10 md:px-20">
        <ul className="max-w-6xl flex justify-between items-center mx-auto relative">
          <li className="text-black flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="logo" width={32} height={32} className="md:w-10 md:h-10" />
              <p className="ml-2 md:ml-3 font-bold text-lg md:text-xl lg:text-2xl">JEALTH BLOG</p>
            </Link>
          </li>
          <li className="relative flex items-center">
            <button
              onClick={toggleSearchBar}
              className={`flex items-center justify-center cursor-pointer z-10 search-toggle p-2 rounded-full transition-all duration-200 ${
                searchBarIsOpen 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label={searchBarIsOpen ? "검색 닫기" : "검색 열기"}
            >
              <BiSearch size={20} className="md:w-5 md:h-5" />
            </button>
          </li>
        </ul>
      </nav>

      {/* 모바일 검색바 */}
      <AnimatePresence>
        {searchBarIsOpen && isMobile && (
          <MobileSearchBar 
            containerRef={searchContainerRef}
            inputRef={searchBarRef}
            defaultValue={lastSearchValue}
            onChange={handleInputChange}
            onClose={() => setSearchBarIsOpen(false)}
            isLoading={isSearchLoading}
            results={searchResults}
            notFound={searchNotFound}
            onItemClick={searchListClickHandler}
          />
        )}
      </AnimatePresence>

      {/* 데스크톱 검색바 */}
      <AnimatePresence>
        {searchBarIsOpen && !isMobile && (
          <DesktopSearchBar 
            containerRef={searchContainerRef}
            inputRef={searchBarRef}
            defaultValue={lastSearchValue}
            onChange={handleInputChange}
            onClose={() => setSearchBarIsOpen(false)}
            isLoading={isSearchLoading}
            results={searchResults}
            notFound={searchNotFound}
            onItemClick={searchListClickHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
}
