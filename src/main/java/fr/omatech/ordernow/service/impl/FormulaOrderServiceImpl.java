package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.FormulaOrderService;
import fr.omatech.ordernow.domain.FormulaOrder;
import fr.omatech.ordernow.repository.FormulaOrderRepository;
import fr.omatech.ordernow.service.dto.FormulaOrderDTO;
import fr.omatech.ordernow.service.mapper.FormulaOrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link FormulaOrder}.
 */
@Service
@Transactional
public class FormulaOrderServiceImpl implements FormulaOrderService {

    private final Logger log = LoggerFactory.getLogger(FormulaOrderServiceImpl.class);

    private final FormulaOrderRepository formulaOrderRepository;

    private final FormulaOrderMapper formulaOrderMapper;

    public FormulaOrderServiceImpl(FormulaOrderRepository formulaOrderRepository, FormulaOrderMapper formulaOrderMapper) {
        this.formulaOrderRepository = formulaOrderRepository;
        this.formulaOrderMapper = formulaOrderMapper;
    }

    /**
     * Save a formulaOrder.
     *
     * @param formulaOrderDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FormulaOrderDTO save(FormulaOrderDTO formulaOrderDTO) {
        log.debug("Request to save FormulaOrder : {}", formulaOrderDTO);
        FormulaOrder formulaOrder = formulaOrderMapper.toEntity(formulaOrderDTO);
        formulaOrder = formulaOrderRepository.save(formulaOrder);
        return formulaOrderMapper.toDto(formulaOrder);
    }

    /**
     * Get all the formulaOrders.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormulaOrderDTO> findAll() {
        log.debug("Request to get all FormulaOrders");
        return formulaOrderRepository.findAllWithEagerRelationships().stream()
            .map(formulaOrderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the formulaOrders with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<FormulaOrderDTO> findAllWithEagerRelationships(Pageable pageable) {
        return formulaOrderRepository.findAllWithEagerRelationships(pageable).map(formulaOrderMapper::toDto);
    }

    /**
     * Get one formulaOrder by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FormulaOrderDTO> findOne(Long id) {
        log.debug("Request to get FormulaOrder : {}", id);
        return formulaOrderRepository.findOneWithEagerRelationships(id)
            .map(formulaOrderMapper::toDto);
    }

    /**
     * Delete the formulaOrder by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FormulaOrder : {}", id);
        formulaOrderRepository.deleteById(id);
    }
}
