package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.MenuService;
import fr.omatech.ordernow.domain.Menu;
import fr.omatech.ordernow.repository.MenuRepository;
import fr.omatech.ordernow.service.dto.MenuDTO;
import fr.omatech.ordernow.service.mapper.MenuMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Menu}.
 */
@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    private final Logger log = LoggerFactory.getLogger(MenuServiceImpl.class);

    private final MenuRepository menuRepository;

    private final MenuMapper menuMapper;

    public MenuServiceImpl(MenuRepository menuRepository, MenuMapper menuMapper) {
        this.menuRepository = menuRepository;
        this.menuMapper = menuMapper;
    }

    /**
     * Save a menu.
     *
     * @param menuDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MenuDTO save(MenuDTO menuDTO) {
        log.debug("Request to save Menu : {}", menuDTO);
        Menu menu = menuMapper.toEntity(menuDTO);
        menu = menuRepository.save(menu);
        return menuMapper.toDto(menu);
    }

    /**
     * Get all the menus.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MenuDTO> findAll() {
        log.debug("Request to get all Menus");
        return menuRepository.findAll().stream()
            .map(menuMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one menu by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MenuDTO> findOne(Long id) {
        log.debug("Request to get Menu : {}", id);
        return menuRepository.findById(id)
            .map(menuMapper::toDto);
    }

    /**
     * Delete the menu by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Menu : {}", id);
        menuRepository.deleteById(id);
    }
}
